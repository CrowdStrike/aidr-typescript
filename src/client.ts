import * as v from 'valibot';

import * as Errors from './core/error';
import type { BodyInit, Fetch, RequestInfo } from './internal/builtin-types';
import { castToError } from './internal/errors';
import {
  buildHeaders,
  type HeadersLike,
  type NullableHeaders,
} from './internal/headers';
import { type APIResponseProps, defaultParseResponse } from './internal/parse';
import type {
  FinalRequestOptions,
  RequestOptions,
} from './internal/request-options';
import type {
  FinalizedRequestInit,
  HTTPMethod,
  PromiseOrValue,
} from './internal/types';
import { sleep } from './internal/utils/sleep';
import { isAbsoluteURL, stringifyQuery } from './internal/utils/values';
import { AcceptedResponseSchema } from './schemas';
import type { AcceptedResponse, MaybeAcceptedResponse } from './types';

function isAcceptedResponse(response: unknown): response is AcceptedResponse {
  return v.safeParse(AcceptedResponseSchema, response).success;
}

export interface ClientOptions {
  /** CS AIDR API token.*/
  token: string;

  /**
   * Template for constructing the base URL for API requests. The placeholder
   * `{SERVICE_NAME}` will be replaced with the service name slug.
   */
  baseURLTemplate: string;

  /**
   * The maximum number of times that the client will retry a request in case of
   * a temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * The maximum number of times that the client will poll for an async request
   * result when receiving a HTTP/202 response.
   *
   * @default 5
   */
  maxPollingAttempts?: number | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * @unit milliseconds
   */
  timeout?: number;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;
}

export abstract class Client {
  /** CS AIDR API token.*/
  token: string;

  /**
   * Template for constructing the base URL for API requests. The placeholder
   * `{SERVICE_NAME}` will be replaced with the service name slug.
   */
  baseURLTemplate: string;
  timeout: number;
  maxRetries: number;
  maxPollingAttempts: number;

  private readonly fetch: Fetch;
  private readonly _options: ClientOptions;
  protected abstract serviceName: string;

  constructor(options: ClientOptions) {
    if (options.token === undefined) {
      throw new Errors.AIDRError(
        'Client was instantiated without an API token.'
      );
    }
    if (options.baseURLTemplate === undefined) {
      throw new Errors.AIDRError(
        'Client was instantiated without a base URL template.'
      );
    }

    this.baseURLTemplate = options.baseURLTemplate;
    this.fetch = options.fetch ?? fetch;
    this.maxRetries = options.maxRetries ?? 2;
    this.maxPollingAttempts = options.maxPollingAttempts ?? 5;
    this.timeout = options.timeout ?? 60_000;
    this.token = options.token;

    this._options = options;
  }

  /**
   * Will retrieve the result, or will return HTTP/202 if the original request
   * is still in progress.
   */
  getAsyncRequest<T>(requestId: string): Promise<MaybeAcceptedResponse<T>> {
    return this.get(`/v1/request/${requestId}`);
  }

  /**
   * Polls for an async request result with exponential backoff.
   * Continues polling until a success response is received or max attempts are reached.
   */
  private async pollAsyncRequest<T>(
    requestId: string,
    maxAttempts: number
  ): Promise<MaybeAcceptedResponse<T>> {
    let lastResponse: MaybeAcceptedResponse<T> | null = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await this.getAsyncRequest<T>(requestId);

      // If we got a success response, return it immediately
      if (response.status === 'Success') {
        return response;
      }

      // Store the last response in case we exhaust attempts
      lastResponse = response;

      // If this is the last attempt, don't sleep
      if (attempt < maxAttempts - 1) {
        const timeoutMillis = this.calculateDefaultRetryTimeoutMillis(
          maxAttempts - attempt - 1,
          maxAttempts
        );
        await sleep(timeoutMillis);
      }
    }

    // Return the last response (should be AcceptedResponse)
    // lastResponse is guaranteed to be set since maxAttempts > 0
    if (lastResponse === null) {
      throw new Errors.AIDRError('Polling failed: no response received');
    }
    return lastResponse;
  }

  protected async get<R>(
    path: string,
    opts?: PromiseOrValue<RequestOptions>
  ): Promise<R> {
    return await this.methodRequest('get', path, opts);
  }

  protected async post<R>(
    path: string,
    opts?: PromiseOrValue<RequestOptions>
  ): Promise<R> {
    return await this.methodRequest('post', path, opts);
  }

  private async methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>
  ): Promise<Rsp> {
    return await this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      })
    );
  }

  private async request<R>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null
  ): Promise<R> {
    const props = await this.makeRequest(options, remainingRetries);
    const parsed = await defaultParseResponse<R>(props);

    if (isAcceptedResponse(parsed)) {
      const finalOptions = await Promise.resolve(options);
      const maxPollingAttempts =
        finalOptions.maxPollingAttempts ?? this.maxPollingAttempts;

      if (maxPollingAttempts <= 0) {
        return parsed;
      }

      return (await this.pollAsyncRequest<R>(
        parsed.request_id,
        maxPollingAttempts
      )) as R;
    }

    return parsed;
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    const { req, url, timeout } = this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(
      url,
      req,
      timeout,
      controller
    ).catch(castToError);

    if (response instanceof globalThis.Error) {
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }

      if (retriesRemaining) {
        return await this.retryRequest(options, retriesRemaining);
      }

      throw new Errors.APIConnectionError({ cause: response });
    }

    if (!response.ok) {
      const shouldRetry = this.shouldRetry(response);

      if (retriesRemaining && shouldRetry) {
        return await this.retryRequest(options, retriesRemaining);
      }

      // TODO: throw error based on status
    }

    return { response, options, controller };
  }

  private shouldRetry(response: Response): boolean {
    return (
      response.status === 408 ||
      response.status === 409 ||
      response.status === 429 ||
      response.status >= 500
    );
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number
  ): Promise<APIResponseProps> {
    const maxRetries = options.maxRetries ?? this.maxRetries;
    const timeoutMillis = this.calculateDefaultRetryTimeoutMillis(
      retriesRemaining,
      maxRetries
    );

    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1);
  }

  private calculateDefaultRetryTimeoutMillis(
    retriesRemaining: number,
    maxRetries: number
  ): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(
      initialRetryDelay * 2 ** numRetries,
      maxRetryDelay
    );

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  private async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    if (signal) {
      signal.addEventListener('abort', () => controller.abort());
    }

    const timeout = setTimeout(() => controller.abort(), ms);

    const fetchOptions: RequestInit = {
      signal: controller.signal,
      method: 'GET',
      ...options,
    };
    if (method) {
      fetchOptions.method = method.toUpperCase();
    }

    try {
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {}
  ): { req: FinalizedRequestInit; url: string; timeout: number } {
    const options = { ...inputOptions };
    const { method, path, query, baseURLTemplate } = options;

    const url = this.buildURL(
      path,
      query as Record<string, unknown>,
      baseURLTemplate
    );
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = this.buildHeaders({
      options: inputOptions,
      method,
      bodyHeaders,
      retryCount,
    });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...(body && { body }),
    };

    return { req, url, timeout: options.timeout };
  }

  private buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    baseURLTemplate: string = this.baseURLTemplate
  ): string {
    const url = new URL(
      (isAbsoluteURL(path)
        ? path
        : baseURLTemplate +
          (baseURLTemplate.endsWith('/') && path.startsWith('/')
            ? path.slice(1)
            : path)
      ).replaceAll('{SERVICE_NAME}', this.serviceName)
    );

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  private buildBody({
    options: { body, headers: _rawHeaders },
  }: {
    options: FinalRequestOptions;
  }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }

    // TODO: other body types.

    return {
      bodyHeaders: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    };
  }

  private buildHeaders({
    options,
    bodyHeaders,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Headers {
    const headers = buildHeaders([
      {
        Accept: 'application/json',
        'User-Agent': 'aidr-typescript',
      },
      this.authHeaders(),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    return headers.values;
  }

  private authHeaders(): NullableHeaders {
    return buildHeaders([{ Authorization: `Bearer ${this.token}` }]);
  }
}

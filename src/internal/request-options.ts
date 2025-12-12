import type { HeadersLike } from './headers';
import type { HTTPMethod } from './types';

export type RequestOptions = {
  /** Query parameters to include in the request URL. */
  query?: object | undefined | null;

  /**
   * The request body. Can be a string, JSON object, FormData, or other
   * supported types.
   */
  body?: unknown;

  /**
   * The maximum number of times that the client will retry a request in case of
   * a temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * The maximum number of times that the client will poll for an async request
   * result when receiving a HTTP/202 response.
   *
   * @default 5
   */
  maxPollingAttempts?: number;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait
   * for a response from the server before timing out a single request.
   *
   * @unit milliseconds
   */
  timeout?: number;

  /**
   * Template for constructing the base URL for API requests. The placeholder
   * `{SERVICE_NAME}` will be replaced with the service name slug.
   */
  baseURLTemplate?: string;

  /**
   * HTTP headers to include with the request. Can be a Headers object, plain
   * object, or array of tuples.
   */
  headers?: HeadersLike;

  /** An AbortSignal that can be used to cancel the request. */
  signal?: AbortSignal | undefined | null;
};

export type FinalRequestOptions = RequestOptions & {
  method: HTTPMethod;
  path: string;
};

export class AIDRError extends Error {}

export class APIError<
  TStatus extends number | undefined = number | undefined,
  THeaders extends Headers | undefined = Headers | undefined,
  TError extends object | undefined = object | undefined,
> extends AIDRError {
  /** HTTP status for the response that caused the error */
  readonly status: TStatus;
  /** HTTP headers for the response that caused the error */
  readonly headers: THeaders;
  /** JSON body of the response that caused the error */
  readonly error: TError;

  constructor(
    status: TStatus,
    error: TError,
    message: string | undefined,
    headers: THeaders
  ) {
    super(`${APIError.makeMessage(status, error, message)}`);
    this.status = status;
    this.headers = headers;
    this.error = error;
  }

  private static makeMessage(
    status: number | undefined,
    // biome-ignore lint/suspicious/noExplicitAny: matches upstream.
    error: any,
    message: string | undefined
  ) {
    const msg = error?.message
      ? typeof error.message === 'string'
        ? error.message
        : JSON.stringify(error.message)
      : error
        ? JSON.stringify(error)
        : message;

    if (status && msg) {
      return `${status} ${msg}`;
    }
    if (status) {
      return `${status} status code (no body)`;
    }
    if (msg) {
      return msg;
    }
    return '(no status code or body)';
  }
}

export class APIUserAbortError extends APIError<
  undefined,
  undefined,
  undefined
> {
  constructor({ message }: { message?: string } = {}) {
    super(undefined, undefined, message || 'Request was aborted.', undefined);
  }
}

export class APIConnectionError extends APIError<
  undefined,
  undefined,
  undefined
> {
  constructor({
    message,
    cause,
  }: { message?: string | undefined; cause?: Error | undefined }) {
    super(undefined, undefined, message || 'Connection error.', undefined);
    if (cause) {
      this.cause = cause;
    }
  }
}

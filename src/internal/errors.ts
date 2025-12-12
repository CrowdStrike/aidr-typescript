// biome-ignore lint/suspicious/noExplicitAny: matches upstream.
export function castToError(err: any): Error {
  if (err instanceof Error) {
    return err;
  }
  if (typeof err === 'object' && err !== null) {
    try {
      if (Object.prototype.toString.call(err) === '[object Error]') {
        const error = new Error(
          err.message,
          err.cause ? { cause: err.cause } : {}
        );
        if (err.stack) {
          error.stack = err.stack;
        }
        if (err.cause && !error.cause) {
          error.cause = err.cause;
        }
        if (err.name) {
          error.name = err.name;
        }
        return error;
      }
    } catch {
      /** no-op */
    }
    try {
      return new Error(JSON.stringify(err));
    } catch {
      /** no-op */
    }
  }
  return new Error(err);
}

export type Fetch = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

/**
 * The type for constructing `RequestInit` body.
 *
 * https://developer.mozilla.org/docs/Web/API/RequestInit#body
 */
export type BodyInit = RequestInit['body'];

/**
 * The type for the first argument to `fetch`.
 *
 * https://developer.mozilla.org/docs/Web/API/Window/fetch#resource
 */
export type RequestInfo = Request | URL | string;

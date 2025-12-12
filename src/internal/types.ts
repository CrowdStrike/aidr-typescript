export type PromiseOrValue<T> = T | Promise<T>;
export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type FinalizedRequestInit = RequestInit & { headers: Headers };

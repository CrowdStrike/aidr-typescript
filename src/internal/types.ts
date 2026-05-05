type NotAny<T> = [0] extends [1 & T] ? never : T;

export type PromiseOrValue<T> = T | Promise<T>;
export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type FinalizedRequestInit = RequestInit & { headers: Headers };

// These imports attempt to get types from a parent package's dependencies.
// Unresolved bare specifiers can trigger automatic type acquisition[1] in some
// projects, which would cause typescript to show types not present at runtime.
// To avoid this, we import directly from parent `node_modules` folders.
//
// We need to check multiple levels because we don't know what directory
// structure we'll be in. For example, pnpm generates directories like this:
//
// ```
// node_modules
// ├── .pnpm
// │   └── pkg@1.0.0
// │       └── node_modules
// │           └── pkg
// │               └── internal
// │                   └── types.d.ts
// ├── pkg -> .pnpm/pkg@1.0.0/node_modules/pkg
// └── undici
// ```
//
// [1]: https://www.typescriptlang.org/tsconfig/#typeAcquisition

/** @ts-expect-error For users with \@types/node */
// biome-ignore format: Easier to ts-expect-error a single line.
type UndiciTypesRequestInit = NotAny<import('../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../../../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../../../../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../../../../../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../../../../../../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../../node_modules/undici-types/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../../../node_modules/undici-types/index.d.ts').RequestInit>;
/** @ts-expect-error For users with undici */
// biome-ignore format: Easier to ts-expect-error a single line.
type UndiciRequestInit = NotAny<import('../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../../../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../../../../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../../../../../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../../../../../../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../../node_modules/undici/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../../../node_modules/undici/index.d.ts').RequestInit>;
/** @ts-expect-error For users with \@types/bun */
type BunRequestInit = globalThis.FetchRequestInit;
/** @ts-expect-error For users with node-fetch@2 */
// biome-ignore format: Easier to ts-expect-error a single line.
type NodeFetch2RequestInit = NotAny<import('../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../../../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../../../../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../../../../../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../../../../../../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../../node_modules/@types/node-fetch/index.d.ts').RequestInit> | NotAny<import('../../../../../../../../../../node_modules/@types/node-fetch/index.d.ts').RequestInit>;
/** @ts-expect-error For users with node-fetch@3, doesn't need file extension because types are at ./@types/index.d.ts */
// biome-ignore format: Easier to ts-expect-error a single line.
type NodeFetch3RequestInit =  NotAny<import('../node_modules/node-fetch').RequestInit> | NotAny<import('../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../../../../../node_modules/node-fetch').RequestInit>;
/** @ts-expect-error For users who use Deno */
type FetchRequestInit = NonNullable<OverloadedParameters<typeof fetch>[1]>;

type RequestInits =
  | NotAny<UndiciTypesRequestInit>
  | NotAny<UndiciRequestInit>
  | NotAny<BunRequestInit>
  | NotAny<NodeFetch2RequestInit>
  | NotAny<NodeFetch3RequestInit>
  | NotAny<RequestInit>
  | NotAny<FetchRequestInit>;

/**
 * This type contains `RequestInit` options that may be available on the current
 * runtime, including per-platform extensions like `dispatcher`, `agent`,
 * `client`, etc.
 */
export type MergedRequestInit = RequestInits &
  // We don't include these in the types as they'll be overridden for every
  // request.
  Partial<Record<'body' | 'headers' | 'method' | 'signal', never>>;

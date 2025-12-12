import * as Errors from '../../core/error';

const startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;

export function isAbsoluteURL(url: string): boolean {
  return startsWithSchemeRegexp.test(url);
}

export function stringifyQuery(query: Record<string, unknown>): string {
  return Object.entries(query)
    .filter(([_, value]) => typeof value !== 'undefined')
    .map(([key, value]) => {
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      if (value === null) {
        return `${encodeURIComponent(key)}=`;
      }
      throw new Errors.AIDRError(
        `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null.`
      );
    })
    .join('&');
}

export let isArray = (val: unknown): val is unknown[] =>
  (
    // biome-ignore lint/suspicious/noAssignInExpressions: matches upstream.
    // biome-ignore lint/complexity/noCommaOperator: matches upstream.
    (isArray = Array.isArray), isArray(val)
  );
export const isReadonlyArray = isArray as (
  val: unknown
) => val is readonly unknown[];

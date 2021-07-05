declare const BRAND: unique symbol;

/**
 * Brand<string, 'OrderId'> = OrderId (A string that can only be getting from the API).
 */
export type Brand<T, K extends string> = T & {[BRAND]: K};

/**
 * IncludeUndefined<string> = false.
 * IncludeUndefined<string | undefined> = true.
 */
type IncludeUndefined<T> = true extends (T extends undefined ? true : never) ? true : false;

/**
 * OneOrTwoArgs<'foo', string> = ['foo', string].
 * OneOrTwoArgs<'foo', undefined | number> = ['foo'] | ['foo', number].
 */
export type OneOrTwoArgs<K, A> = IncludeUndefined<A> extends true ? [K, A?] : [K, A];

/**
 * UnionToIntersection<((x: string) => number) | ((x: number) => string)> =
 *  ((x: string) => number) & ((x: number) => string)
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

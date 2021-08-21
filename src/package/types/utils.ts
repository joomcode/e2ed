/**
 * Inner key for brand types.
 */
declare const BRAND: unique symbol;

declare const PARAMS_KEY: unique symbol;

/**
 * Inner key for params type.
 */
export type PARAMS = typeof PARAMS_KEY;

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
 * Normalizes intersection of types.
 */
export type Normalize<T> = {
  [K in keyof T]: T[K];
};

/**
 * Returns the type of instance params.
 */
export type GetParamsType<C> = C extends {[PARAMS_KEY]: unknown} ? Normalize<C[PARAMS]> : never;

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

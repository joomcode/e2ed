/**
 * Inner key for brand types.
 */
declare const BRAND: unique symbol;

/**
 * Inner key for params type.
 */
declare const PARAMS_KEY: unique symbol;

/**
 * Type of inner key for params type.
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
 * Returns a copy of the object type with mutable properties.
 * Mutable<{readonly foo: string}> = {foo: string}.
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * Normalizes intersection of types.
 * Normalize<{foo: string} & {bar: number}> = {foo: string, bar: number}.
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

/**
 * UnwrapPromise<number> = number.
 * UnwrapPromise<Promise<string>> = string.
 * UnwrapPromise<Promise<Promise<bigint>>> = bigint.
 */
export type UnwrapPromise<T> = T extends Promise<infer V> ? UnwrapPromise<V> : T;

/**
 * Function by argument, return type, and this (context) type.
 */
export type Fn<Args extends unknown[] = never[], ReturnType = unknown, This = unknown> = (
  this: This,
  ...args: Args
) => ReturnType;

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
export type Brand<T, K extends string> = T & {readonly [BRAND]: K};

/**
 * Return true, if T is brand type.
 * IsBrand<3> = false.
 * IsBrand<Brand<3, 'foo'> = true.
 */
export type IsBrand<T> = [T] extends [{[BRAND]: unknown}] ? true : false;

/**
 * Readonly type with recursive applying.
 * DeepReadonly<{foo: {bar: 0}}> = {readonly foo: {readonly bar: 0}}.
 */
export type DeepReadonly<T> = keyof T extends never
  ? T
  : IsBrand<T> extends true
  ? T
  : {readonly [K in keyof T]: DeepReadonly<T[K]>};

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

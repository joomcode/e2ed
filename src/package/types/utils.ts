import type {IsBrand} from './brand';

/**
 * Inner key for params type.
 */
declare const PARAMS_KEY: unique symbol;

/**
 * IncludeUndefined<string> = false.
 * IncludeUndefined<string | undefined> = true.
 */
type IncludeUndefined<T> = true extends (T extends undefined ? true : never) ? true : false;

/**
 * Entry pair that Object.entries(T) returns.
 */
type EntryPair<T> = [keyof T, T[keyof T] | undefined];

/**
 * List of pairs that Object.entries(T) returns.
 */
export type ObjectEntries<T> = EntryPair<T>[];

/**
 * This type checks that the type true is passed to it.
 */
export type Expect<T extends true> = T;

/**
 * Function by argument, return type, and this (context) type.
 */
export type Fn<Args extends unknown[] = never[], ReturnType = unknown, This = unknown> = (
  this: This,
  ...args: Args
) => ReturnType;

/**
 * Return true if types are exactly equal and false otherwise.
 * IsEqual<{foo: string}, {foo: string}> = true.
 * IsEqual<{readonly foo: string}, {foo: string}> = false.
 */
export type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

/**
 * Type of inner key for params type.
 */
export type PARAMS_KEY_TYPE = typeof PARAMS_KEY;

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
export type Normalize<T> = keyof T extends never
  ? T
  : IsBrand<T> extends true
  ? T
  : {[K in keyof T]: Normalize<T[K]>};

/**
 * Returns the type of instance params.
 */
export type GetParamsType<C> = C extends {[PARAMS_KEY]: unknown}
  ? Normalize<C[PARAMS_KEY_TYPE]>
  : never;

/**
 * ZeroOrOneArg<string> = [arg: string].
 * ZeroOrOneArg<undefined | number> = [arg?: number].
 */
export type ZeroOrOneArg<Arg> = IncludeUndefined<Arg> extends true ? [arg?: Arg] : [arg: Arg];

/**
 * OneOrTwoArgs<'foo', string> = [arg1: 'foo', arg2: string].
 * OneOrTwoArgs<'foo', undefined | number> = [arg1: 'foo', arg2?: number].
 */
export type OneOrTwoArgs<Arg1, Arg2> = IncludeUndefined<Arg2> extends true
  ? [arg1: Arg1, arg2?: Arg2]
  : [arg1: Arg1, arg2: Arg2];

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

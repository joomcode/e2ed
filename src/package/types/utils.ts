import type {IsBrand} from './brand';
import type {IsIncludeUndefined} from './undefined';

/**
 * Inner key for params type.
 */
declare const PARAMS_KEY: unique symbol;

/**
 * Entry pair that Object.entries(T) returns.
 */
type EntryPair<T> = [keyof T, T[keyof T] | undefined];

/**
 * Returns the type of instance params.
 */
export type GetParamsType<C> = C extends {[PARAMS_KEY]: unknown}
  ? Normalize<C[PARAMS_KEY_TYPE]>
  : never;

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
 * List of pairs that Object.entries(T) returns.
 */
export type ObjectEntries<T> = EntryPair<T>[];

/**
 * Returns a tuple of two elements. If the second element includes undefined,
 * then it becomes optional in the tuple.
 * OneOrTwoArgs<'foo', string> = [arg1: 'foo', arg2: string].
 * OneOrTwoArgs<'foo', undefined | number> = [arg1: 'foo', arg2?: number].
 */
export type OneOrTwoArgs<Arg1, Arg2> = IsIncludeUndefined<Arg2> extends true
  ? [arg1: Arg1, arg2?: Arg2]
  : [arg1: Arg1, arg2: Arg2];

/**
 * The property value will be optional if its default value
 * is included in the set of possible values.
 * OptionalIfValueIncludeDefault<'foo', 1 | 2, 2> = {foo?: 1 | 2}.
 * OptionalIfValueIncludeDefault<'foo', 1 | 2, 3> = {foo: 1 | 2}.
 * OptionalIfValueIncludeDefault<'foo', {bar?: string}, {}> = {foo?: {bar?: string}}.
 * OptionalIfValueIncludeDefault<'foo', {bar: string}, {}> = {foo: {bar: string}}.
 */
export type OptionalIfValueIncludeDefault<
  Key extends string,
  Value,
  DefaultValue,
> = DefaultValue extends Value ? {[K in Key]?: Value} : {[K in Key]: Value};

/**
 * Type of inner key for params type.
 */
export type PARAMS_KEY_TYPE = typeof PARAMS_KEY;

/**
 * Takes a union, and returns the intersection of the elements of the union.
 * UnionToIntersection<((x: string) => number) | ((x: number) => string)> =
 *  ((x: string) => number) & ((x: number) => string)
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/**
 * If the type is a promise, unwraps it and returns the promise value type
 * (until a non-promise value is obtained).
 * UnwrapPromise<number> = number.
 * UnwrapPromise<Promise<string>> = string.
 * UnwrapPromise<Promise<Promise<bigint>>> = bigint.
 */
export type UnwrapPromise<T> = T extends Promise<infer V> ? UnwrapPromise<V> : T;

/**
 * If the type is a set, unwraps it and returns the set value type.
 * UnwrapSet<number> = number.
 * UnwrapSet<Set<string>> = string.
 */
export type UnwrapSet<T> = T extends Set<infer V> ? V : T;

/**
 * Returns a tuple of one element. If the element includes undefined,
 * then it becomes optional in the tuple.
 * ZeroOrOneArg<string> = [arg: string].
 * ZeroOrOneArg<undefined | number> = [arg?: number].
 */
export type ZeroOrOneArg<Arg> = IsIncludeUndefined<Arg> extends true ? [arg?: Arg] : [arg: Arg];

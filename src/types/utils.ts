import type {IsBrand} from './brand';
import type {IsIncludeUndefined} from './undefined';

/**
 * Entry pair that `Object.entries<Type>` returns.
 */
type EntryPair<Type> = [key: keyof Type, value: Values<Type> | undefined];

/**
 * Alias for type any (to suppress the @typescript-eslint/no-explicit-any rule).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

/**
 * Returns the type of instance params.
 */
export type GetParamsType<Class> = Class extends {['__PARAMS_KEY']: unknown}
  ? Normalize<Class['__PARAMS_KEY']>
  : never;

/**
 * Returns `true` if type is an array (or tuple) of given element's type, and `false` otherwise.
 * `IsArray<[]>` = `true`.
 * `IsArray<[true, false]>` = `true`.
 * `IsArray<readonly [1, 2], number>` = `true`.
 * `IsArray<[1, 2], string>` = `false`.
 * `IsArray<string[], string>` = `true`.
 */
export type IsArray<Type, Element = unknown> = Type extends readonly Element[] ? true : false;

/**
 * Returns a copy of the object type with mutable properties.
 * `Mutable<{readonly foo: string}>` = `{foo: string}`.
 */
export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

/**
 * Normalizes intersection of types.
 * `Normalize<{foo: string} & {bar: number}>` = `{foo: string, bar: number}`.
 */
export type Normalize<Type> = keyof Type extends never
  ? Type
  : IsBrand<Type> extends true
    ? Type
    : {[Key in keyof Type]: Normalize<Type[Key]>};

/**
 * List of pairs that `Object.entries<Type>` returns.
 */
export type ObjectEntries<Type> = EntryPair<Type>[];

/**
 * Returns a tuple of two elements. If the second element includes `undefined`,
 * then it becomes optional in the tuple.
 * `OneOrTwoArgs<'foo', string>` = `[arg1: 'foo', arg2: string]`.
 * `OneOrTwoArgs<'foo', undefined | number>` = `[arg1: 'foo', arg2?: number]`.
 */
export type OneOrTwoArgs<Arg1, Arg2> =
  IsIncludeUndefined<Arg2> extends true ? [arg1: Arg1, arg2?: Arg2] : [arg1: Arg1, arg2: Arg2];

/**
 * The property value will be optional if its default value
 * is included in the set of possible values.
 * `OptionalIfValueIncludeDefault<'foo', 1 | 2, 2>` = `{foo?: 1 | 2}`.
 * `OptionalIfValueIncludeDefault<'foo', 1 | 2, 3>` = `{foo: 1 | 2}`.
 * `OptionalIfValueIncludeDefault<'foo', {bar?: string}, {}>` = `{foo?: {bar?: string}}`.
 * `OptionalIfValueIncludeDefault<'foo', {bar: string}, {}>` = `{foo: {bar: string}}`.
 */
export type OptionalIfValueIncludeDefault<
  Key extends string,
  Value,
  DefaultValue,
> = DefaultValue extends Value ? {[K in Key]?: Value} : {[K in Key]: Value};

/**
 * Takes a union, and returns the intersection of the elements of the union.
 * `UnionToIntersection<((x: string) => number) | ((x: number) => string)>` =
 *  `((x: string) => number) & ((x: number) => string)`
 */
export type UnionToIntersection<Union> = (
  Union extends unknown ? (arg: Union) => void : never
) extends (arg: infer Intersection) => void
  ? Intersection
  : never;

/**
 * If the type is a set, unwraps it and returns the set value type.
 * `UnwrapSet<number>` = `number`.
 * `UnwrapSet<Set<string>>` = `string`.
 */
export type UnwrapSet<Type> = Type extends Set<infer Value> ? Value : Type;

/**
 * Values of all properties of type `Type`.
 * `Values<{foo: 1, bar: 2}>` = `1 | 2`.
 * `Values<[1, 2], true>` = `1 | 2`.
 */
export type Values<Type, WithArrays extends boolean = false> = WithArrays extends true
  ? Type extends readonly unknown[]
    ? Type[number]
    : Type[keyof Type]
  : Type[keyof Type];

/**
 * Returns a tuple of one element. If the element includes `undefined`,
 * then it becomes optional in the tuple.
 * `ZeroOrOneArg<string>` = `[arg: string]`.
 * `ZeroOrOneArg<undefined | number>` = `[arg?: number]`.
 */
export type ZeroOrOneArg<Arg> = IsIncludeUndefined<Arg> extends true ? [arg?: Arg] : [arg: Arg];

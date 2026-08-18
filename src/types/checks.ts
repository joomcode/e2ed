/**
 * This type checks that the type `true` is passed to it.
 */
export type Expect<Type extends true> = Type;

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
 * Returns `true` if types are exactly equal and `false` otherwise.
 * `IsEqual<{foo: string}, {foo: string}>` = `true`.
 * `IsEqual<{readonly foo: string}, {foo: string}>` = `false`.
 */
export type IsEqual<X, Y> =
  (<Type>() => Type extends X ? 1 : 2) extends <Type>() => Type extends Y ? 1 : 2 ? true : false;

/**
 * Returns `true` if key is readonly in object and `false` otherwise.
 * `IsReadonlyKey<{readonly foo?: 2}, 'foo'>` = `true`.
 * `IsReadonlyKey<{foo: ''}, 'foo'>` = `false`.
 */
export type IsReadonlyKey<SomeObject extends object, Key extends keyof SomeObject> = IsEqual<
  Readonly<Pick<SomeObject, Key>>,
  Pick<SomeObject, Key>
>;

/**
 * Returns `true` if type is a union, and `false` otherwise.
 * `IsUnion<0 | 1> = `true`.
 * `IsUnion<'foo'> = `false`.
 */
export type IsUnion<Type, Union = Type> = Type extends unknown
  ? [Union] extends [Type]
    ? false
    : true
  : never;

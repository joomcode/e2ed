/**
 * This type checks that the type `true` is passed to it.
 */
export type Expect<Type extends true> = Type;

/**
 * Returns `true` if types are exactly equal and `false` otherwise.
 * IsEqual<{foo: string}, {foo: string}> = true.
 * IsEqual<{readonly foo: string}, {foo: string}> = false.
 */
export type IsEqual<X, Y> =
  (<Type>() => Type extends X ? 1 : 2) extends <Type>() => Type extends Y ? 1 : 2 ? true : false;

/**
 * Returns `true` if key is readonly in object and `false` otherwise.
 * IsReadonlyKey<{readonly foo?: 2}, 'foo'> = true.
 * IsReadonlyKey<{foo: ''}, 'foo'> = false.
 */
export type IsReadonlyKey<SomeObject extends object, Key extends keyof SomeObject> = IsEqual<
  Readonly<Pick<SomeObject, Key>>,
  Pick<SomeObject, Key>
>;

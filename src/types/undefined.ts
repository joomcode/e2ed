import type {IsEqual} from './checks';

/**
 * Clone object without properties with undefined value.
 * `CloneWithoutUndefinedProperties<{foo: 1 | undefined, bar: undefined}>` =
 *  `{foo: 1 | undefined, bar: never}`.
 */
export type CloneWithoutUndefinedProperties<Type extends object> = {
  [Key in keyof Type]: IsEqual<Type[Key], undefined> extends true ? never : Type[Key];
};

/**
 * Exclude type undefined from object properties.
 * `ExcludeUndefinedFromProperties<{foo: 1 | undefined}>` = `{foo: 1}`.
 */
export type ExcludeUndefinedFromProperties<Type extends object> = {
  [Key in keyof Type]: Exclude<Type[Key], undefined>;
};

/**
 * Returns `true` if union type includes `undefined` and `false` otherwise.
 * `IsIncludeUndefined<string>` = `false`.
 * `IncludeUndefined<string | undefined>` = `true`.
 */
export type IsIncludeUndefined<Type> = true extends (Type extends undefined ? true : never)
  ? true
  : false;

/**
 * Alias for void type (to suppress the @typescript-eslint/no-invalid-void-type rule).
 */
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type Void = void;

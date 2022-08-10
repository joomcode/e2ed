import type {IsEqual} from './checks';

/**
 * Clone object without properties with undefined value.
 * CloneWithoutUndefinedProperties<{foo: 1 | undefined, bar: undefined}> =
 *  {foo: 1 | undefined, bar: never}.
 */
export type CloneWithoutUndefinedProperties<T extends object> = {
  [Key in keyof T]: IsEqual<T[Key], undefined> extends true ? never : T[Key];
};

/**
 * Exclude type undefined from object properties.
 * ExcludeUndefinedFromProperties<{foo: 1 | undefined}> = {foo: 1}.
 */
export type ExcludeUndefinedFromProperties<T extends object> = {
  [Key in keyof T]: Exclude<T[Key], undefined>;
};

/**
 * Return true if type includes undefined and false otherwise.
 * IsIncludeUndefined<string> = false.
 * IncludeUndefined<string | undefined> = true.
 */
export type IsIncludeUndefined<T> = true extends (T extends undefined ? true : never)
  ? true
  : false;

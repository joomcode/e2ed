type GenericPropertyDescriptor = Readonly<{
  configurable?: boolean;
  enumerable?: boolean;
}>;

type DataPropertyDescriptor<Value> = Readonly<
  {value: Value; writable?: boolean} | {value?: Value; writable: boolean}
> &
  GenericPropertyDescriptor;

type AccessorPropertyDescriptor<Value> = Readonly<
  {get?(): Value; set(value: Value): void} | {get(): Value; set?(value: Value): void}
> &
  GenericPropertyDescriptor;

/**
 * Any object.
 */
export type AnyObject = Record<PropertyKey, unknown>;

/**
 * Field replacer for `replaceFields` function.
 */
export type FieldReplacer = (
  this: void,
  path: readonly PropertyKey[],
  value: unknown,
  parent: object,
) => unknown;

/**
 * Primitive value.
 */
export type PrimitiveValue = bigint | boolean | number | string | symbol | null | undefined;

/**
 * Property descriptor.
 */
export type PropertyDescriptor<Value = unknown> =
  | AccessorPropertyDescriptor<Value>
  | DataPropertyDescriptor<Value>
  | GenericPropertyDescriptor;

/**
 * Property key.
 */
export type PropertyKey = string | symbol;

import type {IsReadonlyKey} from '../../types/internal';

/**
 * Set value to readonly property of some object.
 */
export const setReadonlyProperty = <SomeObject extends object, Property extends keyof SomeObject>(
  someObject: SomeObject,
  property: IsReadonlyKey<SomeObject, Property> extends true ? Property : never,
  value: SomeObject[Property],
): SomeObject[Property] => {
  // eslint-disable-next-line no-param-reassign
  someObject[property as Property] = value;

  return value;
};

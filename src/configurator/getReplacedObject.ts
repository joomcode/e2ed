/* eslint-disable no-param-reassign */

import type {AnyObject, FieldReplacer, PropertyKey} from '../types/internal';

const maxPathLength = 512;

/**
 * Recursively get replaced object with replaced fields.
 * @internal
 */
export const getReplacedObject = <Value extends object>(
  path: PropertyKey[],
  value: Value,
  replacer: FieldReplacer,
): Value => {
  const pathLength = path.length;

  if (pathLength > maxPathLength) {
    return value;
  }

  const replacedObject = (Array.isArray(value) ? [] : {}) as Value;

  const keys: PropertyKey[] = Object.keys(value);

  keys.push(...Object.getOwnPropertySymbols(value));

  for (const key of keys) {
    path[pathLength] = key;

    const fieldValue = (value as AnyObject)[key];
    let newFieldValue = replacer(path, fieldValue, value);

    if (newFieldValue === undefined) {
      continue;
    }

    if (
      newFieldValue !== null &&
      typeof newFieldValue === 'object' &&
      !(newFieldValue instanceof String)
    ) {
      newFieldValue = getReplacedObject(path, newFieldValue, replacer);
    }

    (replacedObject as AnyObject)[key] = newFieldValue;
  }

  path.length = pathLength;

  return replacedObject;
};

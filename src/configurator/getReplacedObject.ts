/* eslint-disable no-param-reassign */

import {getReplacedFields} from './getReplacedFields';
import {hasToJsonMethod} from './hasToJsonMethod';

import type {AnyObject, FieldReplacer, PropertyKey} from '../types/internal';

const maxPathLength = 500;

/**
 * Recursively get replaced object with replaced fields.
 * @internal
 */
export const getReplacedObject = <Value extends object>(
  path: PropertyKey[],
  originalValue: Value,
  replacer: FieldReplacer,
): Value => {
  const pathLength = path.length;

  if (pathLength > maxPathLength) {
    return originalValue;
  }

  const value = (
    hasToJsonMethod(originalValue) ? originalValue.toJSON(path.at(-1)) : originalValue
  ) as Value;

  const replacedObject = (Array.isArray(value) ? [] : {}) as Value;

  for (const field of getReplacedFields(value)) {
    path[pathLength] = field;

    const fieldValue = (value as AnyObject)[field];
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

    (replacedObject as AnyObject)[field] = newFieldValue;
  }

  path.length = pathLength;

  return replacedObject;
};

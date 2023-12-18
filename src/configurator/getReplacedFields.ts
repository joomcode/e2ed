import type {PropertyKey} from '../types/internal';

const maxFieldsCount = 1_000;

/**
 * Get array of replaced fields of object for `replaceFields` function.
 * @internal
 */
export const getReplacedFields = (value: object): readonly PropertyKey[] => {
  const fields: PropertyKey[] =
    value instanceof Error ? Object.getOwnPropertyNames(value) : Object.keys(value);

  fields.push(...Object.getOwnPropertySymbols(value));

  if (fields.length > maxFieldsCount) {
    fields.length = maxFieldsCount;
  }

  return fields;
};

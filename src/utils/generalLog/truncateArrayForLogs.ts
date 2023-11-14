import {MAX_ELEMENTS_COUNT_IN_PRINTED_ARRAY} from '../../constants/internal';

type Return<Type> = readonly Type[] | Readonly<{firstElements: readonly Type[]; length: number}>;

/**
 * Truncate a long array for a short printout.
 * @internal
 */
export const truncateArrayForLogs = <Type>(array: readonly Type[]): Return<Type> => {
  if (array.length <= MAX_ELEMENTS_COUNT_IN_PRINTED_ARRAY) {
    return array;
  }

  return {firstElements: array.slice(0, MAX_ELEMENTS_COUNT_IN_PRINTED_ARRAY), length: array.length};
};

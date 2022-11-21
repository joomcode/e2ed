import {MAX_ELEMENTS_COUNT_IN_PRINTED_ARRAY} from '../../constants/internal';

type Return<T> = readonly T[] | Readonly<{firstElements: readonly T[]; length: number}>;

/**
 * Truncate a long array for a short printout.
 * @internal
 */
export const truncateArrayForLogs = <T>(array: readonly T[]): Return<T> => {
  if (array.length <= MAX_ELEMENTS_COUNT_IN_PRINTED_ARRAY) {
    return array;
  }

  return {firstElements: array.slice(0, MAX_ELEMENTS_COUNT_IN_PRINTED_ARRAY), length: array.length};
};

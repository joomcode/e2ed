/**
 * Maximum count of printed array elements.
 * @internal
 */
const MAX_PRINTED_ELEMENTS_COUNT = 8;

type Return<T> = readonly T[] | Readonly<{firstElements: readonly T[]; length: number}>;

/**
 * Truncate a long array for a short printout.
 * @internal
 */
export const truncateArrayForLogs = <T>(array: readonly T[]): Return<T> => {
  if (array.length <= MAX_PRINTED_ELEMENTS_COUNT) {
    return array;
  }

  return {firstElements: array.slice(0, MAX_PRINTED_ELEMENTS_COUNT), length: array.length};
};

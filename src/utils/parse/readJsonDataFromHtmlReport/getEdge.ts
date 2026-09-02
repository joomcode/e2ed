/**
 * Get edge (last `length` characters) of string stream after `chunk`,
 * using `previousEdge` if `chunk` is shorter than `length`.
 * @internal
 */
export const getEdge = (previousEdge: string, chunk: string, length: number): string => {
  if (chunk.length >= length) {
    return chunk.slice(-length);
  }

  return (previousEdge + chunk).slice(-length);
};

type Pair<Key, Value> = [key: Key, value: Value];

/**
 * Clones objects with sorted fields.
 */
export const cloneWithSortedFields = <Key extends string, Value>(
  object: Readonly<Record<Key, Value>>,
  compareFn: (pairA: Pair<Key, Value>, pairB: Pair<Key, Value>) => number = ([keyA], [keyB]) =>
    // eslint-disable-next-line no-nested-ternary
    keyA > keyB ? 1 : keyA < keyB ? -1 : 0,
  result: Record<Key, Value> = Object.create(null) as Record<Key, Value>,
): Readonly<Record<Key, Value>> => {
  const pairs = Object.entries(object) as Pair<Key, Value>[];

  pairs.sort(compareFn);

  for (const [key, value] of pairs) {
    // eslint-disable-next-line no-param-reassign
    result[key] = value;
  }

  return result;
};

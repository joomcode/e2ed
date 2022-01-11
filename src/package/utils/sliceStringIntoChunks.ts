/**
 * Slice string into iterable chunks by given max chunk length.
 * @internal
 */
export function* sliceStringIntoChunks(string: string, chunkLength: number): Generator<string> {
  let index = 0;

  while (index < string.length) {
    const nextIndex = Math.min(string.length, index + chunkLength);

    yield string.slice(index, nextIndex);

    index = nextIndex;
  }
}

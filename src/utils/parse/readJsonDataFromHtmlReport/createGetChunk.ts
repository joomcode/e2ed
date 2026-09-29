const options = {stream: true};

type GetChunk = (sourceChunk: Uint8Array | string) => string;

/**
 * Get string chunk from `string` or `Uint8Array`.
 * @internal
 */
export const createGetChunk = (isString: boolean): GetChunk => {
  if (isString) {
    return ((sourceChunk: string): string => sourceChunk) as GetChunk;
  }

  // no final `decoder.decode()`: complete report ends with ASCII, so nothing is left in decoder
  const decoder = new TextDecoder();

  return ((sourceChunk: Uint8Array): string => decoder.decode(sourceChunk, options)) as GetChunk;
};

import {createHash} from 'node:crypto';

const defaultLength = 10;

/**
 * Get `sha1`-hash (in `base64url`) of text with specified length.
 */
export const getHash = (data: Uint8Array | string, length: number = defaultLength): string => {
  const hash = createHash('sha1');

  hash.update(data);

  return hash.digest('base64url').slice(0, length);
};

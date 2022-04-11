import {createHash} from 'node:crypto';

const algorithm = 'sha256';

/**
 * Get CSP sha256-hash for source file by source text.
 * @internal
 */
export const getCspHash = (source: string): string => {
  const hashed = createHash(algorithm).update(source, 'utf8').digest('base64');

  return `${algorithm}-${hashed}`;
};

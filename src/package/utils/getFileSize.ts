import {stat} from 'fs/promises';

/**
 * Get file size in bytes.
 * If the file does not exist, return a value of 0 bytes.
 * @internal
 */
export const getFileSize = (path: string): Promise<number> =>
  stat(path).then(
    ({size}) => size,
    () => 0,
  );

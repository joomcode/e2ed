import {createWriteStream} from 'node:fs';
import {Readable} from 'node:stream';

import type {FilePathFromRoot} from '../../types/internal';

/**
 * Analogue of `fs.writeFile`, working on streams (to support large files).
 */
export const writeFile = (path: FilePathFromRoot, data: Uint8Array | string): Promise<void> => {
  const sourceStream = Readable.from(data);
  const targetStream = createWriteStream(path);

  sourceStream.pipe(targetStream);

  return new Promise((resolve, reject) => {
    sourceStream.on('error', reject);
    targetStream.on('error', reject);
    targetStream.on('finish', resolve);
  });
};

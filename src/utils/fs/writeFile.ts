import {createWriteStream} from 'node:fs';
import {dirname} from 'node:path';
import {Readable} from 'node:stream';

import {createDirectory} from './createDirectory';

import type {DirectoryPathFromRoot, FilePathFromRoot} from '../../types/internal';

/**
 * Analogue of `fs.writeFile`, working on streams (to support large files).
 */
export const writeFile = async (
  path: FilePathFromRoot,
  data: Uint8Array | string,
): Promise<void> => {
  let buffer: Buffer;

  if (data instanceof Buffer) {
    buffer = data;
  } else {
    buffer = Buffer.from(data);
  }

  const directoryPath = dirname(path) as DirectoryPathFromRoot;

  await createDirectory(directoryPath);

  const sourceStream = Readable.from(buffer);
  const targetStream = createWriteStream(path);

  sourceStream.pipe(targetStream);

  await new Promise<void>((resolve, reject) => {
    sourceStream.on('error', reject);
    targetStream.on('error', reject);
    targetStream.on('close', resolve);
  });
};

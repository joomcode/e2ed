import {createWriteStream} from 'node:fs';
import {writeFile as nativeWriteFile} from 'node:fs/promises';
import {Readable} from 'node:stream';

import {DEFAULT_FILE_CHUNK_LENGTH} from '../../constants/internal';

import {sliceStringIntoChunks} from '../sliceStringIntoChunks';

/**
 * Analogue of fs.writeFile, working on streams (to support large files).
 */
export const writeFile = (path: string, text: string): Promise<void> => {
  if (text.length < 2 * DEFAULT_FILE_CHUNK_LENGTH) {
    return nativeWriteFile(path, text);
  }

  const sourceIterator = sliceStringIntoChunks(text, DEFAULT_FILE_CHUNK_LENGTH);

  const sourceStream = Readable.from(sourceIterator);
  const targetStream = createWriteStream(path);

  sourceStream.pipe(targetStream);

  return new Promise((resolve, reject) => {
    sourceStream.on('end', resolve);
    sourceStream.on('error', reject);
  });
};

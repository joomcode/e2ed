import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {EVENTS_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../constants/internal';

/**
 * Reads event object with test run from temporary directory.
 * @internal
 */
export const readEventFromFile = (fileName: string): Promise<string | undefined> => {
  const filePath = join(EVENTS_DIRECTORY_PATH, fileName);

  return readFile(filePath, READ_FILE_OPTIONS).catch((error: unknown) => {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const {generalLog} = require<typeof import('../generalLog')>('../generalLog');

    generalLog(`Caught an error on reading text of test run event from file "${fileName}"`, {
      error,
      filePath,
    });

    return undefined;
  });
};

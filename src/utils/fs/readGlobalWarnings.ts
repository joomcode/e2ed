import {readFile} from 'node:fs/promises';

import {GLOBAL_WARNINGS_PATH, READ_FILE_OPTIONS} from '../../constants/internal';

/**
 * Reads global warnings of run from directory.
 * @internal
 */
export const readGlobalWarnings = async (): Promise<readonly string[]> => {
  const globalWarningsJsonString = await readFile(GLOBAL_WARNINGS_PATH, READ_FILE_OPTIONS).catch(
    () => '',
  );

  return JSON.parse(`[${globalWarningsJsonString.slice(0, -2)}]`) as string[];
};

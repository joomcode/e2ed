import {readFile} from 'node:fs/promises';

import {GLOBAL_ERRORS_PATH, READ_FILE_OPTIONS} from '../../constants/internal';

/**
 * Reads global errors of run from directory.
 * @internal
 */
export const readGlobalErrors = async (): Promise<readonly string[]> => {
  const globalErrorsJsonString = await readFile(GLOBAL_ERRORS_PATH, READ_FILE_OPTIONS).catch(
    () => '',
  );

  return JSON.parse(`[${globalErrorsJsonString.slice(0, -2)}]`) as string[];
};

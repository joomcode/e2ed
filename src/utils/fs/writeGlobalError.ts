import {appendFile} from 'node:fs/promises';

import {GLOBAL_ERRORS_PATH} from '../../constants/internal';

/**
 * Writes single global error of run to common file.
 * @internal
 */
export const writeGlobalError = async (globalError: string): Promise<void> => {
  const globalErrorJsonString = JSON.stringify(globalError);

  await appendFile(GLOBAL_ERRORS_PATH, `${globalErrorJsonString},\n`);
};

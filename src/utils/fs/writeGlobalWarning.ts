import {appendFile} from 'node:fs/promises';

import {GLOBAL_WARNINGS_PATH} from '../../constants/internal';

/**
 * Writes single global warning of run to common file.
 * @internal
 */
export const writeGlobalWarning = async (globalWarning: string): Promise<void> => {
  const globalWarningJsonString = JSON.stringify(globalWarning);

  await appendFile(GLOBAL_WARNINGS_PATH, `${globalWarningJsonString},\n`);
};

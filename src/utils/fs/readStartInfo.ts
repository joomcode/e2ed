import {readFile} from 'node:fs/promises';

import {READ_FILE_OPTIONS, START_INFO_PATH} from '../../constants/internal';

import type {StartInfo} from '../../types/internal';

/**
 * Reads `StartInfo` from temporary directory.
 * @internal
 */
export const readStartInfo = async (): Promise<StartInfo> => {
  const startInfoJsonString = await readFile(START_INFO_PATH, READ_FILE_OPTIONS);

  return JSON.parse(startInfoJsonString) as StartInfo;
};

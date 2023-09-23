import {readFileSync} from 'node:fs';

import {READ_FILE_OPTIONS, START_INFO_PATH} from '../../constants/internal';

import type {StartInfo} from '../../types/internal';

/**
 * Read start info from tmp directory in sync manner.
 * @internal
 */
export const readStartInfoSync = (): StartInfo => {
  const startInfoJsonString = readFileSync(START_INFO_PATH, READ_FILE_OPTIONS);

  return JSON.parse(startInfoJsonString) as StartInfo;
};

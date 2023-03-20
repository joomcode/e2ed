import {START_INFO_PATH} from '../../constants/internal';

import {writeFile} from './writeFile';

import type {StartInfo} from '../../types/internal';

/**
 * Writes start info to file in tmp directory.
 * @internal
 */
export const writeStartInfo = async (startInfo: StartInfo): Promise<void> => {
  const startInfoJsonString = JSON.stringify(startInfo);

  await writeFile(START_INFO_PATH, startInfoJsonString);
};

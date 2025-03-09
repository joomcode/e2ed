import {readFile} from 'node:fs/promises';

import {API_STATISTICS_PATH, READ_FILE_OPTIONS} from '../../constants/internal';

import type {ApiStatistics} from '../../types/internal';

/**
 * Reads total API statistics from temporary directory.
 * @internal
 */
export const readApiStatistics = async (): Promise<readonly ApiStatistics[]> => {
  const apiStatisticsJsonString = await readFile(API_STATISTICS_PATH, READ_FILE_OPTIONS).catch(
    () => '',
  );

  return JSON.parse(`[${apiStatisticsJsonString.slice(0, -2)}]`) as ApiStatistics[];
};

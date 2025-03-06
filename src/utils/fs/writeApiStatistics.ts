import {appendFile} from 'node:fs/promises';

import {API_STATISTICS_PATH} from '../../constants/internal';

import type {ApiStatistics} from '../../types/internal';

/**
 * Writes API statistics of current test to common file.
 * @internal
 */
export const writeApiStatistics = async (apiStatistics: ApiStatistics): Promise<void> => {
  const apiStatisticsJsonString = JSON.stringify(apiStatistics);

  await appendFile(API_STATISTICS_PATH, `${apiStatisticsJsonString},\n`);
};

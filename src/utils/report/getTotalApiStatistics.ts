import {sortJsonKeys} from 'sort-json-keys';

import {addApiStatistics} from '../apiStatistics';

import type {ApiStatistics} from '../../types/internal';

/**
 * Get total API statistics by summing the API statistics of all tests.
 * @internal
 */
export const getTotalApiStatistics = (
  apiStatisticsOfTests: readonly ApiStatistics[],
): ApiStatistics => {
  const totalApiStatistics: ApiStatistics = {
    pages: Object.create(null) as {},
    requests: Object.create(null) as {},
    resources: Object.create(null) as {},
  };

  for (const apiStatistics of apiStatisticsOfTests) {
    addApiStatistics(totalApiStatistics, apiStatistics);
  }

  return sortJsonKeys(totalApiStatistics);
};

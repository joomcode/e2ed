import {useContext} from '../useContext';

import type {ApiStatistics} from '../types/internal';

/**
 * Raw get and set internal (maybe `undefined`) API statistics.
 * @internal
 */
const [getRawApiStatistics, setRawApiStatistics] = useContext<ApiStatistics>();

/**
 * Get internal always defined API statistics.
 * @internal
 */
export const getApiStatistics = (): ApiStatistics => {
  const maybeApiStatistics = getRawApiStatistics();

  if (maybeApiStatistics !== undefined) {
    return maybeApiStatistics;
  }

  const apiStatistics: ApiStatistics = {
    pages: Object.create(null) as {},
    requests: Object.create(null) as {},
  };

  setRawApiStatistics(apiStatistics);

  return apiStatistics;
};

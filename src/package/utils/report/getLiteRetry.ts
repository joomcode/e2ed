import {getLiteTestRun} from './getLiteTestRun';

import type {LiteRetry, Retry} from '../../types/internal';

/**
 * Get lite retry from retry (for lite report).
 * @internal
 */
export const getLiteRetry = (fullRetry: Retry): LiteRetry => {
  const {endTimeInMs, fullTestRuns, retry, startTimeInMs} = fullRetry;

  const liteTestRuns = fullTestRuns.map(getLiteTestRun);

  return {endTimeInMs, liteTestRuns, retry, startTimeInMs};
};

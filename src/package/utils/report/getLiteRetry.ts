import {TestRunStatus} from '../../constants/internal';

import {getLiteTestRun} from './getLiteTestRun';

import type {LiteRetry, Retry} from '../../types/internal';

/**
 * Get lite retry from retry (for lite report).
 * @internal
 */
export const getLiteRetry = (fullRetry: Retry): LiteRetry => {
  const {concurrency, endTimeInMs, fullTestRuns, retryIndex, startTimeInMs} = fullRetry;

  const allLiteTestRuns = fullTestRuns.map(getLiteTestRun);

  const brokenLiteTestRuns = allLiteTestRuns.filter(({status}) => status === TestRunStatus.Broken);
  const liteTestRuns = allLiteTestRuns.filter(({status}) => status !== TestRunStatus.Broken);

  return {brokenLiteTestRuns, concurrency, endTimeInMs, liteTestRuns, retryIndex, startTimeInMs};
};

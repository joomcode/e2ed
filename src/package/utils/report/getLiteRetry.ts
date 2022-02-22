import {TestRunStatus} from '../../constants/internal';

import {getLiteTestRun} from './getLiteTestRun';

import type {LiteRetry, Retry} from '../../types/internal';

/**
 * Get lite retry from retry (for lite report).
 * @internal
 */
export const getLiteRetry = (fullRetry: Retry): LiteRetry => {
  const {endTimeInMs, fullTestRuns, retry, startTimeInMs} = fullRetry;

  const allLiteTestRuns = fullTestRuns.map(getLiteTestRun);

  const brokenLiteTestRuns = allLiteTestRuns.filter(({status}) => status === TestRunStatus.Broken);
  const liteTestRuns = allLiteTestRuns.filter(
    ({status}) => status === TestRunStatus.Failed || status === TestRunStatus.Passed,
  );

  return {brokenLiteTestRuns, endTimeInMs, liteTestRuns, retry, startTimeInMs};
};

import {ExitStatus, FAILED_TEST_RUN_STATUSES} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';

import type {Retry} from '../../types/internal';

/**
 * Get e2ed exit status (from complete report data).
 * @internal
 */
export const getExitStatus = (retries: readonly Retry[]): ExitStatus => {
  if (retries.length === 0) {
    return ExitStatus.NoRetries;
  }

  const lastRetry = retries[retries.length - 1];

  assertValueIsDefined(lastRetry, 'lastRetry is defined', {retries});

  const {fullTestRuns} = lastRetry;
  const hasFailedTests = fullTestRuns.some(({status}) => FAILED_TEST_RUN_STATUSES.includes(status));

  if (hasFailedTests) {
    return ExitStatus.Failed;
  }

  return ExitStatus.Passed;
};

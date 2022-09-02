import {ExitCode, FAILED_TEST_RUN_STATUSES} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';

import type {Retry} from '../../types/internal';

/**
 * Get e2ed exit code (from complete report data).
 * @internal
 */
export const getExitCode = (retries: readonly Retry[]): ExitCode => {
  if (retries.length === 0) {
    return ExitCode.NoRetries;
  }

  const lastRetry = retries[retries.length - 1];

  assertValueIsDefined(lastRetry, 'lastRetry is defined', {retries});

  const {fullTestRuns} = lastRetry;
  const hasFailedTests = fullTestRuns.some(({status}) => FAILED_TEST_RUN_STATUSES.includes(status));

  if (hasFailedTests) {
    return ExitCode.Failed;
  }

  return ExitCode.Passed;
};

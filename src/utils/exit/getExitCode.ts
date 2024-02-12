import {ExitCode, FAILED_TEST_RUN_STATUSES} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';

import type {Retry} from '../../types/internal';

/**
 * Get e2ed exit code by `hasError` flag and array of retries.
 * @internal
 */
export const getExitCode = (hasError: boolean, retries: readonly Retry[]): ExitCode => {
  if (hasError) {
    return ExitCode.HasErrors;
  }

  if (retries.length === 0) {
    return ExitCode.NoRetries;
  }

  const lastRetry = retries.at(-1);

  assertValueIsDefined(lastRetry, 'lastRetry is defined', {retries});

  const {fullTestRuns} = lastRetry;
  const hasFailedTests = fullTestRuns.some(({status}) => FAILED_TEST_RUN_STATUSES.includes(status));

  if (hasFailedTests) {
    return ExitCode.Failed;
  }

  return ExitCode.Passed;
};

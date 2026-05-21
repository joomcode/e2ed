import {FAILED_TEST_RUN_STATUSES, TestRunStatus} from '../../constants/internal';

import type {CompletedTestRun} from '../../types/internal';

/**
 * Returns `true`, if test run was successful, and `false` otherwise.
 * @internal
 */
export const getIsSuccessfulTestRun = ({status}: CompletedTestRun): boolean =>
  status !== 'started' &&
  status !== TestRunStatus.Broken &&
  !FAILED_TEST_RUN_STATUSES.includes(status);

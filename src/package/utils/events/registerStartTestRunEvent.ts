import {RUN_IDS_HASH} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';

import type {TestRunEvent} from '../../types/internal';

/**
 * Register start test run event (for report) before running test.
 * @internal
 */
export const registerStartTestRunEvent = (testRunEvent: TestRunEvent): void => {
  const {runId} = testRunEvent;

  assertValueIsFalse(runId in RUN_IDS_HASH, 'There is no duplicate runId in run ids hash', {
    newTestRun: {...testRunEvent, logEvents: undefined},
    oldTestRun: {...RUN_IDS_HASH[runId], logEvents: undefined},
  });

  RUN_IDS_HASH[runId] = testRunEvent;
};

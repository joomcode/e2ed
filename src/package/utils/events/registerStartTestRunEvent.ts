import {RUN_IDS_HASH} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';

import type {TestRunEvent} from '../../types/internal';

/**
 * Register start test run event (for report) before running test.
 * @internal
 */
export const registerStartTestRunEvent = (testRunEvent: TestRunEvent): void => {
  const {runId} = testRunEvent;

  assertValueIsFalse(runId in RUN_IDS_HASH, 'There is no duplicate runId in run ids hash', {
    newTestRun: cloneWithoutLogEvents(testRunEvent),
    oldTestRun: cloneWithoutLogEvents(RUN_IDS_HASH[runId] as unknown as TestRunEvent),
  });

  RUN_IDS_HASH[runId] = testRunEvent;
};

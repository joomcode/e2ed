import {RUN_IDS_HASH} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';

import type {RunId, TestRunEvent} from '../../types/internal';

/**
 * Get registered TestRun event by its RunId.
 * @internal
 */
export const getTestRunEvent = (runId: RunId): TestRunEvent => {
  const testRunEvent = RUN_IDS_HASH[runId];

  assertValueIsDefined(testRunEvent, 'testRunEvent is defined', {runId});

  return testRunEvent;
};

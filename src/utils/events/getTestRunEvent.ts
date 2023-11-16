import {RUN_IDS_HASH} from '../../constants/internal';

import {assertValueIsDefined, assertValueIsTrue} from '../asserts';

import type {RunId, TestRunEvent} from '../../types/internal';

/**
 * Get registered `TestRunEvent` by its `RunId`.
 * @internal
 */
export const getTestRunEvent = (runId: RunId): TestRunEvent => {
  const testRunEvent = RUN_IDS_HASH[runId];

  assertValueIsDefined(testRunEvent, 'testRunEvent is defined', {runId});

  assertValueIsTrue(testRunEvent.runId === runId, 'testRunEvent has correct runId', {
    runId,
    testRunEvent,
  });

  return testRunEvent;
};

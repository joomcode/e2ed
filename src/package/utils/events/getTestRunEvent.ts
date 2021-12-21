import {RUN_IDS_HASH} from '../../constants/internal';
import {assertValueIsDefined} from '../asserts';

import type {RunId, TestRunEvent} from '../../types/internal';

export const getTestRunEvent = (runId: RunId): TestRunEvent => {
  const testRunEvent = RUN_IDS_HASH[runId];

  assertValueIsDefined(testRunEvent);

  return testRunEvent;
};

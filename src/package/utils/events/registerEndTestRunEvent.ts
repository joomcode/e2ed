import {RUN_IDS_HASH} from '../../constants/internal';
import {assertValueIsDefined, assertValueIsTrue} from '../asserts';
import {writeTestRunToJsonFile} from '../writeTestRunToJsonFile';

import type {EndTestRunEvent, TestRun, TestRunWithHooks} from '../../types/internal';

/**
 * Register end test run event (for report) after test closing.
 * @internal
 */
export const registerEndTestRunEvent = (endTestRunEvent: EndTestRunEvent): Promise<void> => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../../hooks') = require('../../hooks');

  const {runId} = endTestRunEvent;

  const testRunEvent = RUN_IDS_HASH[runId];

  assertValueIsDefined(testRunEvent);
  assertValueIsTrue(testRunEvent.runId === runId);

  const {utcTimeInMs: startTimeInMs, ...restTestRunEvent} = testRunEvent;
  const {errors, utcTimeInMs: endTimeInMs} = endTestRunEvent;

  const testRun: TestRun = {errors, startTimeInMs, endTimeInMs, ...restTestRunEvent};

  const mainParams = hooks.getMainTestRunParams(testRun);
  const runHash = hooks.getTestRunHash(testRun);

  const testRunWithHooks: TestRunWithHooks = {mainParams, runHash, ...testRun};

  return writeTestRunToJsonFile(testRunWithHooks);
};

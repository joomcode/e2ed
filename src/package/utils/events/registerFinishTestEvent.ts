import {RUN_IDS_HASH} from '../../constants/internal';
import {assertValueIsDefined, assertValueIsTrue} from '../asserts';
import {writeTestRunToJsonFile} from '../writeTestRunToJsonFile';

import type {FinishTestEvent, TestRun, TestRunWithHooks} from '../../types/internal';

/**
 * Register finish test event (for report) after test closing.
 * @internal
 */
export const registerFinishTestEvent = (finishTestEvent: FinishTestEvent): Promise<void> => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../../hooks') = require('../../hooks');

  const {runId} = finishTestEvent;

  const runTestEvent = RUN_IDS_HASH[runId];

  assertValueIsDefined(runTestEvent);
  assertValueIsTrue(runTestEvent.runId === runId);

  const {utcTimeInMs: startTimeInMs, ...restRunTestEvent} = runTestEvent;
  const {errors, utcTimeInMs: finishTimeInMs} = finishTestEvent;

  const testRun: TestRun = {errors, startTimeInMs, finishTimeInMs, ...restRunTestEvent};

  const mainParams = hooks.mainTestRunParams(testRun);
  const runHash = hooks.testRunHash(testRun);

  const testRunWithHooks: TestRunWithHooks = {mainParams, runHash, ...testRun};

  return writeTestRunToJsonFile(testRunWithHooks);
};

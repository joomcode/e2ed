import {RUN_IDS_HASH} from '../../constants/internal';
import {assertValueIsDefined, assertValueIsTrue} from '../asserts';
import {writeTestRunToJsonFile} from '../writeTestRunToJsonFile';

import type {FinishTestEvent, TestRun} from '../../types/internal';

/**
 * Register finish test event (for report) after test closing.
 * @internal
 */
export const registerFinishTestEvent = (finishTestEvent: FinishTestEvent): Promise<void> => {
  const {runId} = finishTestEvent;

  const runTestEvent = RUN_IDS_HASH[runId];

  assertValueIsDefined(runTestEvent);
  assertValueIsTrue(runTestEvent.runId === runId);

  const {utcTimeInMs: startTimeInMs, ...restRunTestEvent} = runTestEvent;
  const {errors, utcTimeInMs: finishTimeInMs} = finishTestEvent;

  const testRun: TestRun = {errors, startTimeInMs, finishTimeInMs, ...restRunTestEvent};

  return writeTestRunToJsonFile(testRun);
};

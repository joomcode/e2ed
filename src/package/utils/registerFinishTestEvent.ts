import {RUNS_HASH} from '../constants/internal';

import {assertValueIsDefined, assertValueIsTrue} from './asserts';
import {writeCompletedTestToJsonFile} from './writeCompletedTestToJsonFile';

import type {CompletedTest, FinishTestEvent} from '../types/internal';

/**
 * Register finish test event (for report) after test closing.
 * @internal
 */
export const registerFinishTestEvent = (finishTestEvent: FinishTestEvent): Promise<void> => {
  const {runId} = finishTestEvent;

  const runTestEvent = RUNS_HASH[runId];

  assertValueIsDefined(runTestEvent);
  assertValueIsTrue(runTestEvent.runId === runId);

  const {utcTimeInMs: startTimeInMs, ...restRunTestEvent} = runTestEvent;
  const {errors, utcTimeInMs: finishTimeInMs} = finishTestEvent;

  const completedTest: CompletedTest = {errors, startTimeInMs, finishTimeInMs, ...restRunTestEvent};

  return writeCompletedTestToJsonFile(completedTest);
};

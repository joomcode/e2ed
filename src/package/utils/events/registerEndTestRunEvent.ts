import {assertValueIsTrue} from '../asserts';
import {generalLog} from '../generalLog';
import {writeTestLogsToFile} from '../testLogs';
import {writeTestRunToJsonFile} from '../writeTestRunToJsonFile';

import {getTestRunEvent} from './getTestRunEvent';

import type {EndTestRunEvent, TestRun, TestRunWithHooks} from '../../types/internal';

/**
 * Register end test run event (for report) after test closing.
 * @internal
 */
export const registerEndTestRunEvent = async (endTestRunEvent: EndTestRunEvent): Promise<void> => {
  await writeTestLogsToFile();

  const {runId} = endTestRunEvent;

  const testRunEvent = getTestRunEvent(runId);

  assertValueIsTrue(testRunEvent.runId === runId);

  const {
    clearTimeout,
    ended,
    originalErrors: originalTestRunErrors,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reject,
    utcTimeInMs: startTimeInMs,
    ...restTestRunEvent
  } = testRunEvent;

  assertValueIsTrue(originalTestRunErrors === endTestRunEvent.originalErrors);

  if (ended) {
    generalLog('Try to end TestRunEvent event, but it is already ended', {
      endTestRunEvent: {...endTestRunEvent, logEvents: undefined},
      testRunEvent: {...testRunEvent, logEvents: undefined},
    });

    return;
  }

  (testRunEvent as {ended: boolean}).ended = true;
  clearTimeout();

  const {errors, utcTimeInMs: endTimeInMs} = endTestRunEvent;

  const testRun: TestRun = {endTimeInMs, errors, startTimeInMs, ...restTestRunEvent};

  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../../hooks') = require('../../hooks');

  const mainParams = hooks.getMainTestRunParams(testRun);
  const runHash = hooks.getTestRunHash(testRun);

  const testRunWithHooks: TestRunWithHooks = {mainParams, runHash, ...testRun};

  await writeTestRunToJsonFile(testRunWithHooks);
};

import {assertValueIsTrue} from '../asserts';
import {generalLog} from '../generalLog';
import {getTestRunErrors} from '../getTestRunErrors';

import {getTestRunEvent} from './getTestRunEvent';
import {registerEndTestRunEvent} from './registerEndTestRunEvent';

import type {RunId, TestRunError, UtcTimeInMs} from '../../types/internal';

/**
 * Force end TestRunEvent by its RunId.
 * @internal
 */
export const forceEndTestRunEvent = async (runId: RunId): Promise<void> => {
  const testRunEvent = getTestRunEvent(runId);

  if (testRunEvent.ended) {
    return;
  }

  generalLog('Force end TestRun event', {testRunEvent: {...testRunEvent, logEvents: undefined}});

  assertValueIsTrue(testRunEvent.runId === runId, 'runIds are not equal', {runId, testRunEvent});

  const utcTimeInMs = Date.now() as UtcTimeInMs;

  const {originalErrors} = testRunEvent;
  const errors = getTestRunErrors(originalErrors);

  (errors as TestRunError[]).push({message: 'The test was forced to end'});

  await registerEndTestRunEvent({errors, originalErrors, runId, utcTimeInMs});
};

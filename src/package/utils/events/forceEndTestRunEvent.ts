import {RUN_IDS_HASH} from '../../constants/internal';
import {assertValueIsDefined, assertValueIsTrue} from '../asserts';
import {generalLog} from '../generalLog';
import {getTestRunErrors} from '../getTestRunErrors';

import {registerEndTestRunEvent} from './registerEndTestRunEvent';

import type {RunId, TestRunError, UtcTimeInMs} from '../../types/internal';

/**
 * End TestRunEvent by its RunId.
 * @internal
 */
export const forceEndTestRunEvent = async (runId: RunId): Promise<void> => {
  const testRunEvent = RUN_IDS_HASH[runId];

  assertValueIsDefined(testRunEvent);

  if (testRunEvent.ended) {
    return;
  }

  generalLog('Force end TestRun event', {testRunEvent: {...testRunEvent, logEvents: undefined}});

  assertValueIsTrue(testRunEvent.runId === runId);

  const utcTimeInMs = Date.now() as UtcTimeInMs;

  const {originalErrors} = testRunEvent;
  const errors = getTestRunErrors(originalErrors);

  (errors as TestRunError[]).push({message: 'The test was forced to end'});

  await registerEndTestRunEvent({errors, originalErrors, runId, utcTimeInMs});
};

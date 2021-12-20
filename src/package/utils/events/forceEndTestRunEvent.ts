import {RUN_IDS_HASH} from '../../constants/internal';
import {assertValueIsDefined, assertValueIsTrue} from '../asserts';
import {getTestRunErrors} from '../getTestRunErrors';

import {registerEndTestRunEvent} from './registerEndTestRunEvent';

import type {RunId, UtcTimeInMs} from '../../types/internal';

/**
 * End TestRunEvent by its RunId.
 * @internal
 */
export const forceEndTestRunEvent = async (runId: RunId): Promise<void> => {
  const testRunEvent = RUN_IDS_HASH[runId];

  assertValueIsDefined(testRunEvent);
  assertValueIsTrue(testRunEvent.runId === runId);

  const utcTimeInMs = Date.now() as UtcTimeInMs;

  const {originalErrors} = testRunEvent;
  const errors = getTestRunErrors(originalErrors);

  await registerEndTestRunEvent({errors, originalErrors, runId, utcTimeInMs});
};

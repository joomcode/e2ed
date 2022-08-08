import {getRunId} from '../../context/runId';

import {registerEndTestRunEvent} from '../events';
import {getTestRunErrors} from '../getTestRunErrors';

import type {Inner} from 'testcafe-without-typecheck';

import type {UtcTimeInMs} from '../../types/internal';

/**
 * Internal after test hook.
 * @internal
 */
export const afterTest = async (testController: Inner.TestController): Promise<void> => {
  const utcTimeInMs = Date.now() as UtcTimeInMs;
  const {errs: originalErrors} = testController.testRun;
  const errors = getTestRunErrors(originalErrors);

  const runId = getRunId();

  await registerEndTestRunEvent({errors, originalErrors, runId, utcTimeInMs});
};

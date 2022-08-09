import {getRunId} from '../../context/runId';

import {registerEndTestRunEvent} from '../events';
import {valueToString} from '../valueToString';

import type {TestRunState, UtcTimeInMs} from '../../types/internal';

/**
 * Internal after test hook with TestRun state.
 * @internal
 */
export const afterTest = async (testRunState: TestRunState): Promise<void> => {
  const {error} = testRunState;
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  const runId = getRunId();

  await registerEndTestRunEvent({
    error: error ? valueToString(error) : undefined,
    runId,
    utcTimeInMs,
  });
};

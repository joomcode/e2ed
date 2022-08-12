import {getTestRunEvent} from '../events';

import type {RunId} from '../../types/internal';

/**
 * Run test function with reject in test run event.
 * @internal
 */
export const runTestFn = async (runId: RunId): Promise<void> => {
  const testRunEvent = getTestRunEvent(runId);

  await testRunEvent.testFnWithReject();
};

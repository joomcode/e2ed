import {RUN_IDS_HASH} from '../../constants/internal';
import {E2EDError} from '../E2EDError';

import type {RunTestEvent} from '../../types/internal';

/**
 * Register run test event (for report) before running test.
 * @internal
 */
export const registerRunTestEvent = (runTestEvent: RunTestEvent): Promise<void> => {
  const {runId} = runTestEvent;

  if (runId in RUN_IDS_HASH) {
    throw new E2EDError('Duplicate runId in run ids hash', {runId});
  }

  RUN_IDS_HASH[runId] = runTestEvent;

  return Promise.resolve();
};

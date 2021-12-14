import {RUNS_HASH} from '../constants/internal';

import {E2EDError} from './E2EDError';

import type {RunTestEvent} from '../types/internal';

/**
 * Register run test event (for report) before running test.
 * @internal
 */
export const registerRunTestEvent = (runTestEvent: RunTestEvent): Promise<void> => {
  const {runId} = runTestEvent;

  if (runId in RUNS_HASH) {
    throw new E2EDError('Duplicate runId in runs hash', {runId});
  }

  RUNS_HASH[runId] = runTestEvent;

  return Promise.resolve();
};

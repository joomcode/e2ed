import {RUN_IDS_HASH} from '../../constants/internal';
import {E2EDError} from '../E2EDError';
import {cloneWithoutUndefinedProperties} from '../cloneWithoutUndefinedProperties';

import type {RunTestEvent} from '../../types/internal';

/**
 * Register run test event (for report) before running test.
 * @internal
 */
export const registerRunTestEvent = (runTestEvent: RunTestEvent): Promise<void> => {
  const {runId} = runTestEvent;

  if (runId in RUN_IDS_HASH) {
    const oldTestRun = cloneWithoutUndefinedProperties({
      ...RUN_IDS_HASH[runId],
      logEvents: undefined,
    });
    const newTestRun = cloneWithoutUndefinedProperties({
      ...runTestEvent,
      logEvents: undefined,
    });

    throw new E2EDError('Duplicate runId in run ids hash', {oldTestRun, newTestRun});
  }

  RUN_IDS_HASH[runId] = runTestEvent;

  return Promise.resolve();
};

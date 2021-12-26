import {RUN_IDS_HASH} from '../../constants/internal';

import {cloneWithoutUndefinedProperties} from '../cloneWithoutUndefinedProperties';
import {E2EDError} from '../E2EDError';

import type {TestRunEvent} from '../../types/internal';

/**
 * Register start test run event (for report) before running test.
 * @internal
 */
export const registerStartTestRunEvent = (testRunEvent: TestRunEvent): Promise<void> => {
  const {runId} = testRunEvent;

  if (runId in RUN_IDS_HASH) {
    const oldTestRun = cloneWithoutUndefinedProperties({
      ...RUN_IDS_HASH[runId],
      logEvents: undefined,
    });
    const newTestRun = cloneWithoutUndefinedProperties({
      ...testRunEvent,
      logEvents: undefined,
    });

    throw new E2EDError('Duplicate runId in run ids hash', {
      newTestRun: {...newTestRun, logEvents: undefined},
      oldTestRun: {...oldTestRun, logEvents: undefined},
    });
  }

  RUN_IDS_HASH[runId] = testRunEvent;

  return Promise.resolve();
};

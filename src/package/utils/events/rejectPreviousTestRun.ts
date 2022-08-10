import {E2EDError} from '../E2EDError';

import {getTestRunEvent} from './getTestRunEvent';

import type {TestRunEvent} from '../../types/internal';

/**
 * Reject previous test run, if it is not ended yet.
 * @internal
 */
export const rejectPreviousTestRun = (testRunEvent: TestRunEvent): void => {
  if (testRunEvent.previousRunId === undefined) {
    return;
  }

  const previousTestRunEvent = getTestRunEvent(testRunEvent.previousRunId);

  if (previousTestRunEvent.ended) {
    return;
  }

  const error = new E2EDError(
    'Previous (broken) test run was not ended before new run of this test',
    {
      previousTestRunEvent: {...previousTestRunEvent, logEvents: undefined},
      testRunEvent: {...testRunEvent, logEvents: undefined},
    },
  );

  previousTestRunEvent.reject(error);
};

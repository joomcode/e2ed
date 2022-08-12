import {TestRunStatus} from '../../constants/internal';

import {E2EDError} from '../E2EDError';
import {getTestRunEvent} from '../events';

import {assertTestRunEventIsPreviousOfTestRunEvent} from './assertTestRunEventIsPreviousOfTestRunEvent';

import type {MaybeWithIsTestRunBroken, TestRunEvent} from '../../types/internal';

/**
 * Reject broken test runs if needed (current test run or previous test run of the same test).
 * @internal
 */
export const processBrokenTestRuns = (testRunEvent: TestRunEvent): void => {
  if (testRunEvent.previousRunId === undefined) {
    return;
  }

  const previousTestRunEvent = getTestRunEvent(testRunEvent.previousRunId);

  assertTestRunEventIsPreviousOfTestRunEvent(previousTestRunEvent, testRunEvent);

  if (previousTestRunEvent.status !== TestRunStatus.Unknown) {
    return;
  }

  const error = new E2EDError(
    'Previous (broken) test run was not ended before new run of this test',
    {
      isTestRunBroken: true,
      previousTestRunEvent: {...previousTestRunEvent, logEvents: undefined},
      testRunEvent: {...testRunEvent, logEvents: undefined},
    } as MaybeWithIsTestRunBroken,
  );

  previousTestRunEvent.reject(error);
};

import {TestRunStatus} from '../../constants/internal';

import {cloneWithoutLogEvents} from '../clone';
import {E2edError} from '../error';
import {getTestRunEvent} from '../events';
import {writeBrokenStatusToTestRunJsonFile} from '../fs';

import {assertTestRunEventIsPreviousOfTestRunEvent} from './assertTestRunEventIsPreviousOfTestRunEvent';

import type {MaybeWithIsTestRunBroken, TestRunEvent} from '../../types/internal';

/**
 * Rejects broken test runs if needed (current test run or previous test run of the same test).
 * @internal
 */
export const processBrokenTestRuns = (testRunEvent: TestRunEvent): void => {
  if (testRunEvent.previousRunId === undefined) {
    return;
  }

  const previousTestRunEvent = getTestRunEvent(testRunEvent.previousRunId);

  assertTestRunEventIsPreviousOfTestRunEvent(previousTestRunEvent, testRunEvent);

  const errorParamsForBrokenTest: MaybeWithIsTestRunBroken & Record<string, unknown> = {
    isTestRunBroken: true,
    previousTestRunEvent: cloneWithoutLogEvents(previousTestRunEvent),
    testRunEvent: cloneWithoutLogEvents(testRunEvent),
  };

  if (previousTestRunEvent.status !== TestRunStatus.Unknown) {
    if (previousTestRunEvent.status === TestRunStatus.Failed) {
      (previousTestRunEvent as {status: TestRunStatus}).status = TestRunStatus.Broken;

      void writeBrokenStatusToTestRunJsonFile(previousTestRunEvent.runId);
    } else {
      const error = new E2edError(
        `The previous test has not failed status ${previousTestRunEvent.status}, so current test run should be rejected`,
        errorParamsForBrokenTest,
      );

      testRunEvent.reject(error);
    }

    return;
  }

  const error = new E2edError(
    'The test was rerun, so previous test run should be rejected',
    errorParamsForBrokenTest,
  );

  previousTestRunEvent.reject(error);
};

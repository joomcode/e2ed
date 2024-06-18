import {isDockerRun} from '../../configurator';
import {TestRunStatus} from '../../constants/internal';

import {assertValueIsFalse, assertValueIsTrue} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';
import {getFullPackConfig} from '../config';

import type {EndTestRunEvent, MaybeWithIsTestRunBroken, TestRunEvent} from '../../types/internal';

type Options = Readonly<{
  endTestRunEvent: EndTestRunEvent;
  testRunEvent: TestRunEvent;
}>;

/**
 * Calculate final test run status by start test run event and end test run event.
 * @internal
 */
export const calculateTestRunStatus = ({endTestRunEvent, testRunEvent}: Options): TestRunStatus => {
  const {hasRunError, unknownRunError} = endTestRunEvent;
  const {retry, status: originalStatus} = testRunEvent;

  let status =
    originalStatus === TestRunStatus.Skipped ? TestRunStatus.Skipped : TestRunStatus.Passed;

  if (hasRunError) {
    const logPayload = {endTestRunEvent, testRunEvent: cloneWithoutLogEvents(testRunEvent)};

    assertValueIsFalse(
      status === TestRunStatus.Skipped,
      `status is not ${TestRunStatus.Skipped}`,
      logPayload,
    );

    const isTestRunBroken = Boolean((unknownRunError as MaybeWithIsTestRunBroken)?.isTestRunBroken);

    status = isTestRunBroken ? TestRunStatus.Broken : TestRunStatus.Failed;

    if (isDockerRun) {
      const {maxRetriesCountInDocker} = getFullPackConfig();

      if (retry < maxRetriesCountInDocker) {
        assertValueIsTrue(
          status === TestRunStatus.Failed,
          `status is ${TestRunStatus.Failed}`,
          logPayload,
        );

        status = TestRunStatus.Broken;
      }
    }
  }

  return status;
};

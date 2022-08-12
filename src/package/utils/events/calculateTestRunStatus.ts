import {TestRunStatus} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';

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
  const {isSkipped} = testRunEvent;

  let status = isSkipped ? TestRunStatus.Skipped : TestRunStatus.Passed;

  if (hasRunError) {
    assertValueIsFalse(status === TestRunStatus.Skipped, `status is not ${TestRunStatus.Skipped}`, {
      endTestRunEvent,
      testRunEvent: {...testRunEvent, logEvents: undefined},
    });

    const isTestRunBroken = Boolean((unknownRunError as MaybeWithIsTestRunBroken)?.isTestRunBroken);

    status = isTestRunBroken ? TestRunStatus.Broken : TestRunStatus.Failed;
  }

  return status;
};
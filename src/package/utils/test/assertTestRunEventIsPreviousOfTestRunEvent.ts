import {assertValueIsTrue} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';

import type {TestRunEvent} from '../../types/internal';

/**
 * Assert that test run event is previous (broken) of other test run event.
 * @internal
 */
export const assertTestRunEventIsPreviousOfTestRunEvent = (
  previousTestRunEvent: TestRunEvent,
  testRunEvent: TestRunEvent,
): void => {
  const logInfo = {
    previousTestRunEvent: cloneWithoutLogEvents(previousTestRunEvent),
    testRunEvent: cloneWithoutLogEvents(testRunEvent),
  };

  assertValueIsTrue(
    previousTestRunEvent.runId === testRunEvent.previousRunId,
    'runId is equal to previousRunId',
    logInfo,
  );

  assertValueIsTrue(
    previousTestRunEvent.filePath === testRunEvent.filePath,
    'filePaths are equal',
    logInfo,
  );

  assertValueIsTrue(previousTestRunEvent.name === testRunEvent.name, 'names are equal', logInfo);

  assertValueIsTrue(
    JSON.stringify(previousTestRunEvent.options) === JSON.stringify(testRunEvent.options),
    'options are equal',
    logInfo,
  );

  assertValueIsTrue(
    previousTestRunEvent.runLabel === testRunEvent.runLabel,
    'run labels are equal',
    logInfo,
  );
};

import {TestRunStatus} from '../../constants/internal';

import {cloneWithoutLogEvents} from '../clone';
import {getRunErrorFromError} from '../error';
import {writeTestRunToJsonFile} from '../fs';
import {generalLog, logEndTestRunEvent, writeLogsToFile} from '../generalLog';
import {getUserlandHooks} from '../userland';

import {calculateTestRunStatus} from './calculateTestRunStatus';
import {getTestRunEvent} from './getTestRunEvent';

import type {EndTestRunEvent, FullTestRun, TestRun} from '../../types/internal';

/**
 * Registers end test run event (for report) after test closing.
 * @internal
 */
export const registerEndTestRunEvent = async (endTestRunEvent: EndTestRunEvent): Promise<void> => {
  const {runId} = endTestRunEvent;

  const testRunEvent = getTestRunEvent(runId);

  const {
    logEvents,
    runLabel,
    status: originalStatus,
    utcTimeInMs: startTimeInMs,
    filePath,
    name,
    options,
  } = testRunEvent;

  if (originalStatus !== TestRunStatus.Unknown && originalStatus !== TestRunStatus.Skipped) {
    generalLog(`Try to end test run event, but it is already ended with status ${originalStatus}`, {
      endTestRunEvent,
      testRunEvent: cloneWithoutLogEvents(testRunEvent),
    });

    return;
  }

  const {hasRunError, unknownRunError, utcTimeInMs: endTimeInMs} = endTestRunEvent;

  const status = calculateTestRunStatus({endTestRunEvent, testRunEvent});

  (testRunEvent as {status: TestRunStatus}).status = status;

  const runError = hasRunError ? getRunErrorFromError(unknownRunError) : undefined;

  const testRun: TestRun = {
    endTimeInMs,
    filePath,
    logEvents,
    name,
    options,
    runError,
    runId,
    runLabel,
    startTimeInMs,
    status,
  };

  const {getMainTestRunParams, getTestRunHash} = getUserlandHooks();

  const mainParams = getMainTestRunParams(testRun);
  const runHash = getTestRunHash(testRun);

  const fullTestRun: FullTestRun = {mainParams, runHash, ...testRun};

  logEndTestRunEvent(fullTestRun);

  await writeTestRunToJsonFile(fullTestRun);
  await writeLogsToFile();
};

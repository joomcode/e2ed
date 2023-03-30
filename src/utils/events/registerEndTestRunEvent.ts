import {TestRunStatus} from '../../constants/internal';

import {cloneWithoutLogEvents} from '../clone';
import {writeTestRunToJsonFile} from '../fs';
import {generalLog, logEndTestRunEvent, writeLogsToFile} from '../generalLog';
import {getUserlandHooks} from '../userlandHooks';
import {valueToString, wrapStringForLogs} from '../valueToString';

import {calculateTestRunStatus} from './calculateTestRunStatus';
import {getTestRunEvent} from './getTestRunEvent';

import type {EndTestRunEvent, FullTestRun, TestRun} from '../../types/internal';

/**
 * Register end test run event (for report) after test closing.
 * @internal
 */
export const registerEndTestRunEvent = async (endTestRunEvent: EndTestRunEvent): Promise<void> => {
  await writeLogsToFile();

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

  const runError = hasRunError ? wrapStringForLogs(valueToString(unknownRunError)) : undefined;

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
};

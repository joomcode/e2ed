import {isDebug, TestRunStatus} from '../../constants/internal';
import {getFullMocksState} from '../../context/fullMocks';
import {getPlaywrightPage} from '../../useContext';

import {cloneWithoutLogEvents} from '../clone';
import {getRunErrorFromError} from '../error';
import {writeTestRunToJsonFile} from '../fs';
import {generalLog, logEndTestRunEvent, writeLogsToFile} from '../generalLog';
import {getTimeoutPromise} from '../promise';
import {setReadonlyProperty} from '../setReadonlyProperty';
import {getUserlandHooks} from '../userland';

import {calculateTestRunStatus} from './calculateTestRunStatus';
import {getTestRunEvent} from './getTestRunEvent';
import {writeFullMocks} from './writeFullMocks';

import type {EndTestRunEvent, FullTestRun, TestRun} from '../../types/internal';

const delayForWritingFullMocksInMs = 100;

/**
 * Registers end test run event (for report) after test closing.
 * @internal
 */
export const registerEndTestRunEvent = async (endTestRunEvent: EndTestRunEvent): Promise<void> => {
  const {runId} = endTestRunEvent;

  const testRunEvent = getTestRunEvent(runId);

  const {
    filePath,
    logEvents,
    name,
    options,
    retryIndex,
    runLabel,
    status: originalStatus,
    utcTimeInMs: startTimeInMs,
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

  if (status === TestRunStatus.Passed) {
    const fullMocksState = getFullMocksState();

    if (fullMocksState !== undefined && fullMocksState.appliedMocks === undefined) {
      await getTimeoutPromise(delayForWritingFullMocksInMs);

      await writeFullMocks(fullMocksState).catch((error: unknown) => {
        generalLog('Cannot write "full mocks" for test', {
          endTestRunEvent,
          error,
          testRunEvent: cloneWithoutLogEvents(testRunEvent),
        });
      });
    }
  }

  setReadonlyProperty(testRunEvent, 'status', status);

  const runError = hasRunError ? getRunErrorFromError(unknownRunError) : undefined;

  const testRun: TestRun = {
    endTimeInMs,
    filePath,
    logEvents,
    name,
    options,
    retryIndex,
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

  await logEndTestRunEvent(fullTestRun);

  await writeTestRunToJsonFile(fullTestRun);
  await writeLogsToFile();

  if (isDebug) {
    await getPlaywrightPage().pause();
  }
};

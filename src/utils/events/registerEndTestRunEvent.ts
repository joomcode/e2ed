import {isLocalRun} from '../../configurator';
import {IS_DEBUG, TestRunStatus} from '../../constants/internal';
import {getApiStatistics} from '../../context/apiStatistics';
import {getPlaywrightPage} from '../../useContext';

import {cloneWithoutLogEvents} from '../clone';
import {getRunErrorFromError} from '../error';
import {writeApiStatistics, writeTestRunToJsonFile} from '../fs';
import {generalLog, logEndTestRunEvent, writeLogsToFile} from '../generalLog';
import {setReadonlyProperty} from '../object';
import {getUserlandHooks} from '../userland';

import {calculateTestRunStatus} from './calculateTestRunStatus';
import {getRegroupedSteps} from './getRegroupedSteps';
import {getTestRunEvent} from './getTestRunEvent';
import {writeFullMocksIfNeeded} from './writeFullMocksIfNeeded';

import type {EndTestRunEvent, FullTestRun, RunHash, TestRun} from '../../types/internal';

/**
 * Registers end test run event (for report) after test closing.
 * @internal
 */
export const registerEndTestRunEvent = async (endTestRunEvent: EndTestRunEvent): Promise<void> => {
  const {runId} = endTestRunEvent;
  const testRunEvent = getTestRunEvent(runId);

  const {
    filePath,
    name,
    options,
    outputDirectoryName,
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

  await writeFullMocksIfNeeded(status, testRunEvent);

  setReadonlyProperty(testRunEvent, 'status', status);

  const runError = hasRunError ? getRunErrorFromError(unknownRunError) : undefined;

  const testRun: TestRun = {
    endTimeInMs,
    filePath,
    logEvents: getRegroupedSteps(testRunEvent),
    name,
    options,
    outputDirectoryName,
    retryIndex,
    runError,
    runId,
    runLabel,
    startTimeInMs,
    status,
  };

  const {getMainTestRunParams, getTestRunHash} = getUserlandHooks();

  const mainParams = getMainTestRunParams(testRun);
  const runHash = getTestRunHash(testRun).replaceAll('#', '') as RunHash;

  const fullTestRun: FullTestRun = {mainParams, runHash, ...testRun};

  await logEndTestRunEvent(fullTestRun);

  const apiStatistics = getApiStatistics();

  await writeApiStatistics(apiStatistics);
  await writeTestRunToJsonFile(fullTestRun);
  await writeLogsToFile();

  if (IS_DEBUG && isLocalRun) {
    await getPlaywrightPage().pause();
  }
};

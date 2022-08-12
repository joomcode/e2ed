import {TestRunStatus} from '../../constants/internal';

import {generalLog} from '../generalLog';
import {writeTestLogsToFile} from '../testLogs';
import {valueToString} from '../valueToString';
import {writeTestRunToJsonFile} from '../writeTestRunToJsonFile';

import {calculateTestRunStatus} from './calculateTestRunStatus';
import {getTestRunEvent} from './getTestRunEvent';

import type {EndTestRunEvent, FullTestRun, TestRun} from '../../types/internal';

/**
 * Register end test run event (for report) after test closing.
 * @internal
 */
export const registerEndTestRunEvent = async (endTestRunEvent: EndTestRunEvent): Promise<void> => {
  await writeTestLogsToFile();

  const {runId} = endTestRunEvent;

  const testRunEvent = getTestRunEvent(runId);

  const {
    logEvents,
    runLabel,
    status: originStatus,
    utcTimeInMs: startTimeInMs,
    filePath,
    name,
    options,
  } = testRunEvent;

  if (originStatus !== TestRunStatus.Unknown) {
    generalLog(
      `Try to end test run event, but it is already has no status ${TestRunStatus.Unknown}`,
      {
        endTestRunEvent,
        testRunEvent: {...testRunEvent, logEvents: undefined},
      },
    );

    return;
  }

  const {hasRunError, unknownRunError, utcTimeInMs: endTimeInMs} = endTestRunEvent;

  const status = calculateTestRunStatus({endTestRunEvent, testRunEvent});

  (testRunEvent as {status: TestRunStatus}).status = status;

  const runError = hasRunError ? valueToString(unknownRunError) : undefined;

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

  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../../hooks') = require('../../hooks');

  const mainParams = hooks.getMainTestRunParams(testRun);
  const runHash = hooks.getTestRunHash(testRun);

  const fullTestRun: FullTestRun = {mainParams, runHash, ...testRun};

  await writeTestRunToJsonFile(fullTestRun);
};

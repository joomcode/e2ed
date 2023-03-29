import {TEST_RUN_STATUS_SYMBOLS, TestRunStatus} from '../../constants/internal';

import {generalLog} from './generalLog';

import type {FullTestRun} from '../../types/internal';

const messageBgColorByStatus: Readonly<Record<TestRunStatus, number>> = {
  [TestRunStatus.Failed]: 41,
  [TestRunStatus.Unknown]: 45,
  [TestRunStatus.Passed]: 102,
  [TestRunStatus.Skipped]: 100,
  [TestRunStatus.Manual]: 42,
  [TestRunStatus.Broken]: 43,
};

/**
 * Logs an end of test run event.
 * @internal
 */
export const logEndTestRunEvent = (fullTestRun: FullTestRun): void => {
  const {filePath, mainParams, name, options, runError, runId, status} = fullTestRun;

  const messageBgColor = messageBgColorByStatus[status];
  const messageSymbol = TEST_RUN_STATUS_SYMBOLS[status];
  const messageText = `${messageSymbol} ${status} ${mainParams} ${name}`;

  const message = `\x1B[${messageBgColor}m\x1B[30m${messageText}\x1B[39m\x1B[49m`;

  generalLog(message, {filePath, options, runError, runId});
};

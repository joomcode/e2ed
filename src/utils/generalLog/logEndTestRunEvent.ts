import {
  FAILED_TEST_RUN_STATUSES,
  MESSAGE_BACKGROUND_COLOR_BY_STATUS,
  TEST_RUN_STATUS_SYMBOLS,
  TestRunStatus,
} from '../../constants/internal';

import {generalLog} from './generalLog';
import {getMessageWithBackgroundColor} from './getMessageWithBackgroundColor';
import {addSuccessfulTestRun, getSuccessfulTestFilePaths} from './successfulTestRuns';

import type {FullTestRun} from '../../types/internal';

/**
 * Logs an end of test run event.
 * @internal
 */
export const logEndTestRunEvent = async (fullTestRun: FullTestRun): Promise<void> => {
  const {filePath, mainParams, name, options, runError, runId, status} = fullTestRun;

  if (status !== TestRunStatus.Broken && !FAILED_TEST_RUN_STATUSES.includes(status)) {
    await addSuccessfulTestRun(filePath);
  }

  const messageBackgroundColor = MESSAGE_BACKGROUND_COLOR_BY_STATUS[status];
  const messageSymbol = TEST_RUN_STATUS_SYMBOLS[status];
  const messageText = `${messageSymbol} ${status} ${mainParams} ${name}`;

  const message = getMessageWithBackgroundColor(messageText, messageBackgroundColor);
  const successful = (await getSuccessfulTestFilePaths()).length;

  generalLog(message, {filePath, options, runError, runId, successful});
};

import {
  MESSAGE_BACKGROUND_COLOR_BY_STATUS,
  TEST_RUN_STATUS_SYMBOLS,
} from '../../constants/internal';

import {getSuccessfulTestFilePaths} from '../completedTestRuns';
import {generalLog, getMessageWithBackgroundColor} from '../generalLog';

import type {FullTestRun} from '../../types/internal';

/**
 * Logs an end of test run event.
 * @internal
 */
export const logEndTestRunEvent = async (fullTestRun: FullTestRun): Promise<void> => {
  const {filePath, mainParams, name, options, runError, runId, status} = fullTestRun;

  const messageBackgroundColor = MESSAGE_BACKGROUND_COLOR_BY_STATUS[status];
  const messageSymbol = TEST_RUN_STATUS_SYMBOLS[status];
  const messageText = `${messageSymbol} ${status} ${mainParams} ${name}`;

  const message = getMessageWithBackgroundColor(messageText, messageBackgroundColor);
  const successful = (await getSuccessfulTestFilePaths()).length;

  generalLog(message, {filePath, options, runError, runId, successful});
};

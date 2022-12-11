import {appendFile} from 'node:fs/promises';
import {join} from 'node:path';

import {REPORTS_DIRECTORY_PATH, RESOLVED_PROMISE} from '../../constants/internal';

import {getFullConfig} from '../getFullConfig';

/**
 * Array of test logs. Logs are stored in this array for further saving in test logs file.
 * @internal
 */
const testLogs: string[] = [];

/**
 * Add log message to test logs (for later saving to a test logs file).
 * @internal
 */
export const addTestLog = (logMessage: string): void => {
  testLogs.push(logMessage);
};

/**
 * Write test logs to test logs file (if the config requires it and there are unwritten logs).
 * @internal
 */
export const writeTestLogsToFile = (): Promise<void> => {
  const {testLogsFileName} = getFullConfig();

  if (testLogsFileName === null) {
    return RESOLVED_PROMISE;
  }

  const testLogsFilePath = join(REPORTS_DIRECTORY_PATH, testLogsFileName);
  const testLogsText = testLogs.join('');

  testLogs.length = 0;

  return appendFile(testLogsFilePath, testLogsText);
};

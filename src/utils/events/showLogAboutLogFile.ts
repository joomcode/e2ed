import {join} from 'node:path';

import {
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  REPORTS_DIRECTORY_PATH,
} from '../../constants/internal';

import {getFileSize} from '../fs';
import {generalLog} from '../generalLog';
import {getFileSizeInMb} from '../getFileSizeInMb';

/**
 * Shows log about log file (`pack-logs.log`).
 * @internal
 */
export const showLogAboutLogFile = async (logFileName: string): Promise<void> => {
  const logFilePath = join(
    ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
    REPORTS_DIRECTORY_PATH,
    logFileName,
  );

  const logFileSizeInBytes = await getFileSize(logFilePath);

  const logFileSizeInMb = getFileSizeInMb(logFileSizeInBytes);

  generalLog(`Logs were written (${logFileSizeInMb}) to "file://${logFilePath}"`);
};

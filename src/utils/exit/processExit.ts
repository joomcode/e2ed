import {ExitCode} from '../../constants/internal';

import {generalLog, writeLogsToFile} from '../generalLog';

/**
 * Exit from e2ed process with correct exit code.
 * @internal
 */
export const processExit = async (exitCode: ExitCode = ExitCode.NoReportData): Promise<void> => {
  generalLog(`Exit from e2ed with code ${exitCode}`);

  await writeLogsToFile();

  process.exit(exitCode);
};

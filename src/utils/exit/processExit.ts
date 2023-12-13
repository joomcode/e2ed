import {ExitCode} from '../../constants/internal';

import {generalLog, writeLogsToFile} from '../generalLog';

import {getGlobalExitCode} from './globalExitCode';

/**
 * Exit from e2ed process with correct exit code.
 * @internal
 */
export const processExit = async (
  exitCodeFromReport: ExitCode = ExitCode.NoReportData,
): Promise<void> => {
  const globalExitCode = getGlobalExitCode();

  const exitCode = globalExitCode === undefined ? exitCodeFromReport : globalExitCode;

  generalLog(`Exit from e2ed with code ${exitCode}`);

  await writeLogsToFile();

  process.exit(exitCode);
};

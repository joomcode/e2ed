import {ExitCode} from '../../constants/internal';

import {generalLog, writeLogsToFile} from '../generalLog';

import {getGlobalExitCode} from './globalExitCode';

/**
 * Exit from e2ed process with correct exit code.
 * @internal
 */
export const exitFromE2ed = async (
  exitCodeFromReport: ExitCode = ExitCode.NoReportData,
): Promise<void> => {
  const globalExitCode = getGlobalExitCode();

  const exitCode = globalExitCode ?? exitCodeFromReport;

  generalLog(`Exit from e2ed with code ${exitCode}`);

  await writeLogsToFile();

  process.exit(exitCode);
};

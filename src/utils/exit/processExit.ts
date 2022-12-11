import {ExitCode} from '../../constants/internal';

import {generalLog} from '../generalLog';

/**
 * Exit from e2ed process with correct exit code.
 * @internal
 */
export const processExit = (exitCode: ExitCode = ExitCode.NoReportData): void => {
  generalLog(`Exit from e2ed with code ${exitCode}`);

  process.exit(exitCode);
};

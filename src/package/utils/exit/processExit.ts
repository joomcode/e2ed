import {ExitStatus} from '../../constants/internal';

import {generalLog} from '../generalLog';

/**
 * Exit from e2ed process with correct exit status.
 * @internal
 */
export const processExit = (exitStatus: ExitStatus = ExitStatus.NoReportData): void => {
  generalLog(`Exit from e2ed with status ${exitStatus}`);

  process.exit(exitStatus);
};

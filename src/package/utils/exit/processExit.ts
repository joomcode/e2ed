import {ExitStatus} from '../../constants/internal';

import {generalLog} from '../generalLog';

import type {ReportData} from '../../types/internal';

/**
 * Exit from e2ed process with correct exit status.
 * @internal
 */
export const processExit = (reportData: ReportData | undefined): void => {
  let exitStatus: ExitStatus = ExitStatus.NoReportData;

  if (reportData) {
    exitStatus = reportData.exitStatus;
  }

  generalLog(`Exit from e2ed with status ${exitStatus}`);

  process.exit(exitStatus);
};

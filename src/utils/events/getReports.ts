import {ExitCode} from '../../constants/internal';

import {failMessage, generalLog, okMessage} from '../generalLog';
import {collectReportData, getLiteReport} from '../report';

import {collectFullEventsData} from './collectFullEventsData';

import type {LiteReport, ReportData} from '../../types/internal';

type Return = Readonly<{liteReport: LiteReport; reportData: ReportData}>;

/**
 * Get report data and lite report.
 * @internal
 */
export const getReports = async (): Promise<Return> => {
  const fullEventsData = await collectFullEventsData();

  const reportData = await collectReportData(fullEventsData);

  const stateMessage = reportData.exitCode === ExitCode.Passed ? okMessage : failMessage;

  generalLog(`Results of pack: ${stateMessage} ${reportData.summaryPackResults}`);

  const liteReport = getLiteReport(reportData);

  return {liteReport, reportData};
};

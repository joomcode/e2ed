import {join} from 'node:path';

import {REPORTS_DIRECTORY_PATH} from '../../constants/internal';

import {writeFile} from '../fs';
import {generalLog} from '../generalLog';

import {getLiteReport} from './getLiteReport';

import type {ReportData, UtcTimeInMs} from '../../types/internal';

/**
 * Write lite JSON report (lite-report.json file) with test runs results
 * (and without test run logs).
 * @internal
 */
export const writeLiteJsonReport = async (reportData: ReportData): Promise<void> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const liteReport = getLiteReport(reportData);
  const {liteReportFileName} = liteReport;
  const reportJson = JSON.stringify(liteReport);

  const reportFilePath = join(REPORTS_DIRECTORY_PATH, liteReportFileName);

  await writeFile(reportFilePath, reportJson);

  const duration = Date.now() - startTimeInMs;

  generalLog(
    `Lite JSON report was written (${reportJson.length} symbols) to "${reportFilePath}" in ${duration}ms`,
  );
};

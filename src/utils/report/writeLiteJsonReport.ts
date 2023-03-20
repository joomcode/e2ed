import {join} from 'node:path';

import {REPORTS_DIRECTORY_PATH} from '../../constants/internal';

import {getFileSize, writeFile} from '../fs';
import {generalLog} from '../generalLog';

import type {LiteReport, UtcTimeInMs} from '../../types/internal';

/**
 * Writes lite JSON report (lite-report.json file) with test runs results
 * (and without test run logs).
 * @internal
 */
export const writeLiteJsonReport = async (liteReport: LiteReport): Promise<void> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const {liteReportFileName} = liteReport;
  const reportJson = JSON.stringify(liteReport);

  const reportFilePath = join(REPORTS_DIRECTORY_PATH, liteReportFileName);

  await writeFile(reportFilePath, reportJson);

  const reportFileSize = await getFileSize(reportFilePath);

  const duration = Date.now() - startTimeInMs;

  generalLog(
    `Lite JSON report was written (${reportFileSize} bytes) to "${reportFilePath}" in ${duration}ms`,
  );
};

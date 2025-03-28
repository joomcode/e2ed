import {join} from 'node:path';

import {
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  REPORTS_DIRECTORY_PATH,
} from '../../constants/internal';

import {getFileSize, writeFile} from '../fs';
import {generalLog} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';

import type {FilePathFromRoot, LiteReport, UtcTimeInMs} from '../../types/internal';

const bytesInKiB = 1_024;

/**
 * Writes lite JSON report (`lite-report.json` file) with test runs results
 * (and without test run logs).
 * @internal
 */
export const writeLiteJsonReport = async (liteReport: LiteReport): Promise<void> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const {liteReportFileName} = liteReport;
  const reportJson = JSON.stringify(liteReport);

  const reportFilePath = join(
    ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
    REPORTS_DIRECTORY_PATH,
    liteReportFileName,
  ) as FilePathFromRoot;

  await writeFile(reportFilePath, reportJson);

  const reportFileSizeInBytes = await getFileSize(reportFilePath);

  const reportFileSizeInKiB = (reportFileSizeInBytes / bytesInKiB).toFixed(2);

  const durationWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  generalLog(
    `Lite JSON report was written (${reportFileSizeInKiB} KiB) to "file://${reportFilePath}" in ${durationWithUnits}`,
  );
};

import {writeFile} from 'fs/promises';
import {join} from 'path';

import {REPORTS_DIRECTORY_PATH} from '../../constants/internal';

import {generalLog} from '../generalLog';

import {renderReportToHtml} from './render';

import type {ReportData, UtcTimeInMs} from '../../types/internal';

/**
 * Save HTML report (report.html file) with test runs results.
 * @internal
 */
export const writeHtmlReport = async (reportData: ReportData): Promise<void> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const reportHtml = renderReportToHtml(reportData);
  const reportFileName = `${reportData.name}.html`;
  const reportFilePath = join(REPORTS_DIRECTORY_PATH, reportFileName);

  await writeFile(reportFilePath, reportHtml);

  const duration = Date.now() - startTimeInMs;

  generalLog(
    `HTML report was written (${reportHtml.length} symbols) to "${reportFilePath}" in ${duration} ms`,
  );
};

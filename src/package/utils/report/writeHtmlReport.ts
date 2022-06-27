import {join} from 'node:path';

import {REPORTS_DIRECTORY_PATH} from '../../constants/internal';

import {assertValueIsNotNull} from '../asserts';
import {generalLog} from '../generalLog';
import {writeFile} from '../writeFile';

import {renderReportToHtml} from './render';

import type {ReportData, UtcTimeInMs} from '../../types/internal';

/**
 * Write HTML report (report.html file) with test runs results.
 * @internal
 */
export const writeHtmlReport = async (reportData: ReportData): Promise<void> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const reportHtml = renderReportToHtml(reportData);
  const {reportFileName} = reportData;

  assertValueIsNotNull(reportFileName, 'reportFileName is null');

  const reportFilePath = join(REPORTS_DIRECTORY_PATH, reportFileName);

  await writeFile(reportFilePath, String(reportHtml));

  const duration = Date.now() - startTimeInMs;

  generalLog(
    `HTML report was written (${reportHtml.length} symbols) to "${reportFilePath}" in ${duration} ms`,
  );
};

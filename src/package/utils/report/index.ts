import {writeFile} from 'fs/promises';
import {join} from 'path';

import {REPORTS_DIRECTORY_PATH} from '../../constants/internal';

import {renderHtmlReportToString} from './renderHtmlReportToString';

import type {ReportData} from '../../types/internal';

/**
 * Save HTML report (report.html file) with test runs results.
 * @internal
 */
export const saveHtmlReport = (reportData: ReportData): Promise<void> => {
  const htmlReportString = renderHtmlReportToString(reportData);

  const reportFilePath = join(REPORTS_DIRECTORY_PATH, 'e2ed-report.html');

  return writeFile(reportFilePath, htmlReportString);
};

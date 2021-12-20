import {writeFile} from 'fs/promises';
import {join} from 'path';

import {REPORTS_DIRECTORY_PATH} from '../../constants/internal';
import {generalLog} from '../generalLog';

import {renderHtmlReportToString} from './renderHtmlReportToString';

import type {ReportData} from '../../types/internal';

/**
 * Save HTML report (report.html file) with test runs results.
 * @internal
 */
export const writeHtmlReport = (reportData: ReportData): Promise<void> => {
  const htmlReportString = renderHtmlReportToString(reportData);
  const reportFileName = `${reportData.name}.html`;
  const reportFilePath = join(REPORTS_DIRECTORY_PATH, reportFileName);

  generalLog(`Write HTML report (${htmlReportString.length} symbols) to "${reportFilePath}"`);

  return writeFile(reportFilePath, htmlReportString);
};

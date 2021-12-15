import type {ReportData} from '../../types/internal';

/**
 * Save HTML report (report.html file) with test runs results.
 * @internal
 */
export const saveHTMLReport = async (reportData: ReportData): Promise<void> => {
  void (await Promise.resolve(reportData));
};

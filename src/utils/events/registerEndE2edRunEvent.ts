import {processExit} from '../exit';
import {generalLog} from '../generalLog';
import {collectReportData, writeHtmlReport, writeLiteJsonReport} from '../report';

import {collectFullEventsData} from './collectFullEventsData';

import type {ReportData} from '../../types/internal';

/**
 * Register end e2ed run event (for report) after closing of all tests.
 * @internal
 */
export const registerEndE2edRunEvent = async (): Promise<void> => {
  generalLog('Close e2ed');

  let reportData: ReportData | undefined;

  try {
    const fullEventsData = await collectFullEventsData();

    reportData = await collectReportData(fullEventsData);

    const {liteReportFileName, reportFileName} = reportData;

    if (liteReportFileName !== null) {
      await writeLiteJsonReport(reportData);
    }
    if (reportFileName !== null) {
      await writeHtmlReport(reportData);
    }
  } catch (error) {
    generalLog(
      'Got an error while collecting the report data or writing the html report and lite report',
      {error},
    );
  } finally {
    processExit(reportData?.exitCode);
  }
};

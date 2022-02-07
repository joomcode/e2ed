import {generalLog} from '../generalLog';
import {collectReportData, writeHtmlReport, writeLiteJsonReport} from '../report';

import {collectFullEventsData} from './collectFullEventsData';

import type {EndE2edRunEvent} from '../../types/internal';

/**
 * Register end e2ed run event (for report) after closing of all tests.
 * @internal
 */
export const registerEndE2edRunEvent = async (endE2edRunEvent: EndE2edRunEvent): Promise<void> => {
  generalLog('Close e2ed');

  const fullEventsData = await collectFullEventsData(endE2edRunEvent);
  const reportData = await collectReportData(fullEventsData);

  await writeLiteJsonReport(reportData);
  await writeHtmlReport(reportData);
};

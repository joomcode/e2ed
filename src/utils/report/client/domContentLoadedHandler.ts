import {readJsonReportData as clientReadJsonReportData} from './readJsonReportData';

import type {Mutable, ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

const readJsonReportData = clientReadJsonReportData;

/**
 * DOMContentloaded handler for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function domContentLoadedHandler(): void {
  readJsonReportData();

  window.clearInterval(reportClientState.readJsonReportDataIntervalId);

  (reportClientState as Mutable<ReportClientState>).readJsonReportDataIntervalId = 0;
}

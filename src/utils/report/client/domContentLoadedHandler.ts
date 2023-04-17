import {readJsonReportData as clientReadJsonReportData} from './readJsonReportData';

import type {ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

const readJsonReportData = clientReadJsonReportData;

/**
 * DOMContentloaded handler for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function domContentLoadedHandler(): void {
  readJsonReportData(true);

  for (const observer of reportClientState.readJsonReportDataObservers) {
    observer.disconnect();
  }

  reportClientState.readJsonReportDataObservers.length = 0;
}

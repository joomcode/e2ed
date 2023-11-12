import {readJsonReportData as clientReadJsonReportData} from './readJsonReportData';

import type {ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

const readJsonReportData = clientReadJsonReportData;

/**
 * `DOMContentLoaded` handler for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function onDomContentLoad(): void {
  readJsonReportData(true);

  for (const observer of reportClientState.readJsonReportDataObservers) {
    observer.disconnect();
  }

  reportClientState.readJsonReportDataObservers.length = 0;
}

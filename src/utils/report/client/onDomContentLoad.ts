import {readJsonReportData as clientReadJsonReportData} from './readJsonReportData';

import type {ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

const readJsonReportData = clientReadJsonReportData;

/**
 * `DOMContentLoaded` handler for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export const onDomContentLoad = (): void => {
  const e2edRightColumnContainer = document.getElementById('e2edRightColumnContainer') ?? undefined;

  if (!e2edRightColumnContainer) {
    // eslint-disable-next-line no-console
    console.error(
      'Cannot find right column container (id="e2edRightColumnContainer") after DOMContentLoaded.',
    );
  } else {
    Object.assign<ReportClientState, Partial<ReportClientState>>(reportClientState, {
      e2edRightColumnContainer,
    });
  }

  readJsonReportData(true);

  for (const observer of reportClientState.readJsonReportDataObservers) {
    observer.disconnect();
  }

  reportClientState.readJsonReportDataObservers.length = 0;
};

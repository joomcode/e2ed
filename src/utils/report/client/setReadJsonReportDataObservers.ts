import {readJsonReportData as clientReadJsonReportData} from './readJsonReportData';

import type {ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

const readJsonReportData = clientReadJsonReportData;

/**
 * Set mutation observers for reading JSON report data.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function setReadJsonReportDataObservers(): void {
  const observeChildList = {childList: true};
  const {readJsonReportDataObservers} = reportClientState;
  const scriptsObserver = new MutationObserver(() => readJsonReportData());

  readJsonReportDataObservers.push(scriptsObserver);

  if (document.body) {
    scriptsObserver.observe(document.body, observeChildList);
  } else {
    const htmlObserver = new MutationObserver(() => {
      const body = document.querySelector('body');

      if (body) {
        scriptsObserver.observe(body, observeChildList);

        htmlObserver.disconnect();
      }
    });

    readJsonReportDataObservers.push(htmlObserver);

    htmlObserver.observe(document.documentElement, observeChildList);
  }
}

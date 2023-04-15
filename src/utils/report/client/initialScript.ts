import {addDomContentLoadedHandler as clientAddDomContentLoadedHandler} from './addDomContentLoadedHandler';
import {addOnClickOnClass as clientAddOnClickOnClass} from './addOnClickOnClass';
import {clickOnRetry as clientClickOnRetry} from './clickOnRetry';
import {clickOnStep as clientClickOnStep} from './clickOnStep';
import {clickOnTestRun as clientClickOnTestRun} from './clickOnTestRun';
import {domContentLoadedHandler as clientDomContentLoadedHandler} from './domContentLoadedHandler';
import {readJsonReportData as clientReadJsonReportData} from './readJsonReportData';

import type {Mutable, ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

const addDomContentLoadedHandler = clientAddDomContentLoadedHandler;
const addOnClickOnClass = clientAddOnClickOnClass;
const clickOnRetry = clientClickOnRetry;
const clickOnStep = clientClickOnStep;
const clickOnTestRun = clientClickOnTestRun;
const domContentLoadedHandler = clientDomContentLoadedHandler;
const readJsonReportData = clientReadJsonReportData;

/**
 * Initial report page script.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export const initialScript = (): void => {
  addOnClickOnClass('nav-tabs__button', clickOnRetry);
  addOnClickOnClass('step-expanded', clickOnStep);
  addOnClickOnClass('test-button', clickOnTestRun);

  addDomContentLoadedHandler(domContentLoadedHandler);

  if (!('readJsonReportDataIntervalId' in reportClientState)) {
    readJsonReportData();

    (reportClientState as Mutable<ReportClientState>).readJsonReportDataIntervalId =
      window.setInterval(readJsonReportData, 50);
  }
};

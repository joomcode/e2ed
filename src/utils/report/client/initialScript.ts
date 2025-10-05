import {createSimpleLocator as clientCreateSimpleLocator} from 'create-locator';

import {addDomContentLoadedHandler as clientAddDomContentLoadedHandler} from './addDomContentLoadedHandler';
import {addOnClickOnClass as clientAddOnClickOnClass} from './addOnClickOnClass';
import {clickOnRetry as clientClickOnRetry} from './clickOnRetry';
import {clickOnStep as clientClickOnStep} from './clickOnStep';
import {clickOnTestRun as clientClickOnTestRun} from './clickOnTestRun';
import {createJsxRuntime as clientCreateJsxRuntime} from './createJsxRuntime';
import {onDomContentLoad as clientOnDomContentLoad} from './onDomContentLoad';
import {setReadJsonReportDataObservers as clientSetReadJsonReportDataObservers} from './setReadJsonReportDataObservers';

import type {ReportClientState} from '../../../types/internal';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare let jsx: JSX.Runtime;
declare const reportClientState: ReportClientState;

const addDomContentLoadedHandler = clientAddDomContentLoadedHandler;
const addOnClickOnClass = clientAddOnClickOnClass;
const clickOnRetry = clientClickOnRetry;
const clickOnStep = clientClickOnStep;
const clickOnTestRun = clientClickOnTestRun;
const createJsxRuntime = clientCreateJsxRuntime;
const createSimpleLocator = clientCreateSimpleLocator;
const onDomContentLoad = clientOnDomContentLoad;
const setReadJsonReportDataObservers = clientSetReadJsonReportDataObservers;

/**
 * Initial HTML report page script.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function initialScript(): void {
  jsx = createJsxRuntime();

  const {locator} = createSimpleLocator(reportClientState.createLocatorOptions);

  Object.assign<ReportClientState, Partial<ReportClientState>>(reportClientState, {locator});

  addOnClickOnClass('retry-link', clickOnRetry);
  addOnClickOnClass('step-expanded', clickOnStep);
  addOnClickOnClass('test-link', clickOnTestRun);

  setReadJsonReportDataObservers();

  addDomContentLoadedHandler(onDomContentLoad);
}

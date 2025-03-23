import {
  createSimpleLocator as clientCreateSimpleLocator,
  type LocatorFunction,
} from 'create-locator';

import {addDomContentLoadedHandler as clientAddDomContentLoadedHandler} from './addDomContentLoadedHandler';
import {addOnClickOnClass as clientAddOnClickOnClass} from './addOnClickOnClass';
import {assertValueIsDefined as clientAssertValueIsDefined} from './assertValueIsDefined';
import {clickOnRetry as clientClickOnRetry} from './clickOnRetry';
import {clickOnStep as clientClickOnStep} from './clickOnStep';
import {clickOnTestRun as clientClickOnTestRun} from './clickOnTestRun';
import {createJsxRuntime as clientCreateJsxRuntime} from './createJsxRuntime';
import {onDomContentLoad as clientOnDomContentLoad} from './onDomContentLoad';
import {renderAttributes as clientRenderAttributes} from './render';
import {setReadJsonReportDataObservers as clientSetReadJsonReportDataObservers} from './setReadJsonReportDataObservers';

import type {ReportClientState, SafeHtml} from '../../../types/internal';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare let jsx: JSX.Runtime;
declare const reportClientState: ReportClientState;

const addDomContentLoadedHandler = clientAddDomContentLoadedHandler;
const addOnClickOnClass = clientAddOnClickOnClass;
const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const clickOnRetry = clientClickOnRetry;
const clickOnStep = clientClickOnStep;
const clickOnTestRun = clientClickOnTestRun;
const createJsxRuntime = clientCreateJsxRuntime;
const createSimpleLocator = clientCreateSimpleLocator;
const onDomContentLoad = clientOnDomContentLoad;
const renderAttributes = clientRenderAttributes;
const setReadJsonReportDataObservers = clientSetReadJsonReportDataObservers;

/**
 * Initial HTML report page script.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function initialScript(): void {
  jsx = createJsxRuntime();

  const e2edRightColumnContainer = document.getElementById('e2edRightColumnContainer') ?? undefined;

  assertValueIsDefined(e2edRightColumnContainer);

  const {locator: locatorAttributes} = createSimpleLocator(reportClientState.createLocatorOptions);
  const locator: LocatorFunction<SafeHtml> = (...args) =>
    renderAttributes(locatorAttributes(...(args as [string])));

  Object.assign<ReportClientState, Partial<ReportClientState>>(reportClientState, {
    e2edRightColumnContainer,
    locator,
  });

  addOnClickOnClass('nav-tabs__button', clickOnRetry);
  addOnClickOnClass('step-expanded', clickOnStep);
  addOnClickOnClass('test-button', clickOnTestRun);

  setReadJsonReportDataObservers();

  addDomContentLoadedHandler(onDomContentLoad);
}

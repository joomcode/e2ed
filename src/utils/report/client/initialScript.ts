import {
  type CreateLocatorOptions,
  createSimpleLocator as clientCreateSimpleLocator,
  type LocatorFunction,
} from 'create-locator';

import {addDomContentLoadedHandler as clientAddDomContentLoadedHandler} from './addDomContentLoadedHandler';
import {addOnClickOnClass as clientAddOnClickOnClass} from './addOnClickOnClass';
import {clickOnRetry as clientClickOnRetry} from './clickOnRetry';
import {clickOnStep as clientClickOnStep} from './clickOnStep';
import {clickOnTestRun as clientClickOnTestRun} from './clickOnTestRun';
import {onDomContentLoad as clientOnDomContentLoad} from './onDomContentLoad';
import {renderAttributes as clientRenderAttributes} from './render';
import {setReadJsonReportDataObservers as clientSetReadJsonReportDataObservers} from './setReadJsonReportDataObservers';

import type {SafeHtml} from '../../../types/internal';

declare const createLocatorOptions: CreateLocatorOptions;
declare let locator: LocatorFunction<SafeHtml>;

const addDomContentLoadedHandler = clientAddDomContentLoadedHandler;
const addOnClickOnClass = clientAddOnClickOnClass;
const clickOnRetry = clientClickOnRetry;
const clickOnStep = clientClickOnStep;
const clickOnTestRun = clientClickOnTestRun;
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
  const {locator: locatorAttributes} = createSimpleLocator(createLocatorOptions);

  locator = (...args): SafeHtml => renderAttributes(locatorAttributes(...(args as [string])));

  locator('');

  addOnClickOnClass('nav-tabs__button', clickOnRetry);
  addOnClickOnClass('step-expanded', clickOnStep);
  addOnClickOnClass('test-button', clickOnTestRun);

  setReadJsonReportDataObservers();

  addDomContentLoadedHandler(onDomContentLoad);
}

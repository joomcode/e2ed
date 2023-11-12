import {addDomContentLoadedHandler as clientAddDomContentLoadedHandler} from './addDomContentLoadedHandler';
import {addOnClickOnClass as clientAddOnClickOnClass} from './addOnClickOnClass';
import {clickOnRetry as clientClickOnRetry} from './clickOnRetry';
import {clickOnStep as clientClickOnStep} from './clickOnStep';
import {clickOnTestRun as clientClickOnTestRun} from './clickOnTestRun';
import {onDomContentLoad as clientOnDomContentLoad} from './onDomContentLoad';
import {setReadJsonReportDataObservers as clientSetReadJsonReportDataObservers} from './setReadJsonReportDataObservers';

const addDomContentLoadedHandler = clientAddDomContentLoadedHandler;
const addOnClickOnClass = clientAddOnClickOnClass;
const clickOnRetry = clientClickOnRetry;
const clickOnStep = clientClickOnStep;
const clickOnTestRun = clientClickOnTestRun;
const onDomContentLoad = clientOnDomContentLoad;
const setReadJsonReportDataObservers = clientSetReadJsonReportDataObservers;

/**
 * Initial report page script.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export const initialScript = (): void => {
  addOnClickOnClass('nav-tabs__button', clickOnRetry);
  addOnClickOnClass('step-expanded', clickOnStep);
  addOnClickOnClass('test-button', clickOnTestRun);

  setReadJsonReportDataObservers();

  addDomContentLoadedHandler(onDomContentLoad);
};

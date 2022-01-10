import {addOnClickOnClass as clientAddOnClickOnClass} from './addOnClickOnClass';
import {clickOnRetry as clientClickOnRetry} from './clickOnRetry';
import {clickOnStep as clientClickOnStep} from './clickOnStep';
import {clickOnTestRun as clientClickOnTestRun} from './clickOnTestRun';

const addOnClickOnClass = clientAddOnClickOnClass;
const clickOnRetry = clientClickOnRetry;
const clickOnStep = clientClickOnStep;
const clickOnTestRun = clientClickOnTestRun;

/**
 * Initial report page script.
 * @internal
 */
export const initialScript = (): void => {
  addOnClickOnClass('nav-tabs__button', clickOnRetry);
  addOnClickOnClass('step-expanded', clickOnStep);
  addOnClickOnClass('test-button', clickOnTestRun);
};

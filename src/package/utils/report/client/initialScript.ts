import {e2edAddOnClickOnClass as clientE2edAddOnClickOnClass} from './e2edAddOnClickOnClass';
import {e2edClickOnRetry as clientE2edClickOnRetry} from './e2edClickOnRetry';
import {e2edClickOnTestRun as clientE2edClickOnTestRun} from './e2edClickOnTestRun';

const e2edAddOnClickOnClass = clientE2edAddOnClickOnClass;
const e2edClickOnRetry = clientE2edClickOnRetry;
const e2edClickOnTestRun = clientE2edClickOnTestRun;

/**
 * Initial report page script.
 * @internal
 */
export const initialScript = (): void => {
  e2edAddOnClickOnClass('nav-tabs__button', e2edClickOnRetry);
  e2edAddOnClickOnClass('test-button', e2edClickOnTestRun);
};

import type {e2edAddOnClickOnClass as E2edAddOnClickOnClass} from './e2edAddOnClickOnClass';
import type {e2edClickOnRetry as E2edClickOnRetry} from './e2edClickOnRetry';
import type {e2edClickOnTestRun as E2edClickOnTestRun} from './e2edClickOnTestRun';

declare const e2edAddOnClickOnClass: typeof E2edAddOnClickOnClass;
declare const e2edClickOnRetry: typeof E2edClickOnRetry;
declare const e2edClickOnTestRun: typeof E2edClickOnTestRun;

/**
 * Initial report page script.
 * @internal
 */
export const initialScript = (): void => {
  e2edAddOnClickOnClass('nav-tabs__button', e2edClickOnRetry);
  e2edAddOnClickOnClass('test-button', e2edClickOnTestRun);
};

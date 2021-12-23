import type {e2edAddOnClickOnClass as E2edAddOnClickOnClass} from './e2edAddOnClickOnClass';
import type {e2edClickOnRetry as E2edClickOnRetry} from './e2edClickOnRetry';

declare const e2edAddOnClickOnClass: typeof E2edAddOnClickOnClass;
declare const e2edClickOnRetry: typeof E2edClickOnRetry;

/**
 * Initial report page script.
 * @internal
 */
export const initialScript = (): void => {
  e2edAddOnClickOnClass('nav-tabs__button', e2edClickOnRetry);
};

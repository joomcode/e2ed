import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getCookieOptionsFromPartialCookie} from '../utils/cookie';
import {log} from '../utils/log';

import type {Cookie} from '../types/internal';

/**
 * Set cookies with the specified cookies parameters.
 */
export const setCookies = (cookies: readonly Cookie[]): Promise<void> => {
  log('Set cookies with the specified cookies parameters', {cookies}, LogEventType.InternalAction);

  const cookiesOptions = cookies.map(getCookieOptionsFromPartialCookie);

  return testController.setCookies(cookiesOptions);
};

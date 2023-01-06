import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getCookieOptionsFromPartialCookie} from '../utils/cookie';
import {log} from '../utils/log';

import type {Cookie} from '../types/internal';

/**
 * Deletes cookies with the specified cookies parameters.
 * If there are no cookies parameters, deletes all the cookies.
 */
export const deleteCookies = (cookiesParameters?: Partial<Cookie>[]): Promise<void> => {
  if (cookiesParameters === undefined) {
    log('Deletes all the cookies from all pages', LogEventType.InternalAction);

    return testController.deleteCookies();
  }

  const cookiesOptions = cookiesParameters.map(getCookieOptionsFromPartialCookie);

  log(
    'Deletes cookies with the specified parameters',
    {cookiesParameters},
    LogEventType.InternalAction,
  );

  return testController.deleteCookies(cookiesOptions);
};

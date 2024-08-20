import {LogEventType} from '../constants/internal';
import {getPlaywrightPage} from '../useContext';
import {log} from '../utils/log';

import type {Cookie} from '../types/internal';

/**
 * Returns page's cookies with the specified cookies parameters.
 * If there are no cookies parameters, returns all the cookies.
 */
export const getCookies = async (
  cookiesParameters: Partial<Cookie> = {},
): Promise<readonly Cookie[]> => {
  const page = getPlaywrightPage();
  const parameters = Object.keys(cookiesParameters);

  const allCookies = await page.context().cookies(page.url());

  if (parameters.length === 0) {
    log('Returns all the cookies from all pages', LogEventType.InternalAction);

    return allCookies;
  }

  log(
    'Returns cookies with the specified cookies parameters',
    {allCookies, cookiesParameters},
    LogEventType.InternalAction,
  );

  return allCookies.filter((cookie) => {
    for (const parameter of parameters as (keyof Cookie)[]) {
      if (cookie[parameter] !== cookiesParameters[parameter]) {
        return false;
      }
    }

    return true;
  });
};

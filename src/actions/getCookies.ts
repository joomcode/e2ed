import {LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';

import type {Cookie} from '../types/internal';

/**
 * Returns page's cookies with the specified cookies parameters.
 * If there are no cookies parameters, returns all the cookies.
 */
export const getCookies = async (
  cookiesParameters: Partial<Cookie> = {},
): Promise<readonly Cookie[]> => {
  const parameters = Object.keys(cookiesParameters);

  const logMessage =
    parameters.length === 0
      ? 'Returns all the cookies from current page'
      : 'Returns cookies with the specified cookies parameters from current page';

  let cookies: readonly Cookie[] | undefined;

  await step(
    logMessage,
    async () => {
      const page = getPlaywrightPage();
      const allCookies = await page.context().cookies(page.url());

      if (parameters.length === 0) {
        cookies = allCookies;

        return {allCookies};
      }

      cookies = allCookies.filter((cookie) => {
        for (const parameter of parameters as (keyof Cookie)[]) {
          if (cookie[parameter] !== cookiesParameters[parameter]) {
            return false;
          }
        }

        return true;
      });

      return {allCookies};
    },
    {payload: {cookiesParameters}, type: LogEventType.InternalAction},
  );

  assertValueIsDefined(cookies, 'cookies is defined', {cookiesParameters});

  return cookies;
};

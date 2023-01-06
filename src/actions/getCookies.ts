import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {
  getCookieOptionsFromPartialCookie,
  getPartialCookieFromCookieOptions,
} from '../utils/cookie';
import {log} from '../utils/log';

import type {Inner} from 'testcafe-without-typecheck';

import type {Cookie} from '../types/internal';

/**
 * Returns cookies with the specified cookies parameters.
 * If there are no cookies parameters, returns all the cookies.
 */
export const getCookies = async (
  cookiesParameters?: readonly Partial<Cookie>[],
): Promise<readonly Partial<Cookie>[]> => {
  let cookiesOptions: Inner.CookieOptions[];

  if (cookiesParameters === undefined) {
    log('Returns all the cookies from all pages', LogEventType.InternalAction);

    cookiesOptions = await testController.getCookies();
  } else {
    const cookiesOptionsParameters = cookiesParameters.map(getCookieOptionsFromPartialCookie);

    log(
      'Returns cookies with the specified cookies parameters',
      {cookiesParameters},
      LogEventType.InternalAction,
    );

    cookiesOptions = await testController.getCookies(cookiesOptionsParameters);
  }

  return cookiesOptions.map(getPartialCookieFromCookieOptions);
};

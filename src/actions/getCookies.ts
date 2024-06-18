import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Cookie} from '../types/internal';

/**
 * Returns cookies with the specified cookies parameters.
 * If there are no cookies parameters, returns all the cookies.
 */
export const getCookies = async (
  cookiesParameters?: readonly Partial<Cookie>[],
): Promise<readonly Partial<Cookie>[]> => {
  let cookiesOptions: Cookie[];

  if (cookiesParameters === undefined) {
    log('Returns all the cookies from all pages', LogEventType.InternalAction);

    cookiesOptions = [];
  } else {
    log(
      'Returns cookies with the specified cookies parameters',
      {cookiesParameters},
      LogEventType.InternalAction,
    );

    cookiesOptions = [];
  }

  // TODO
  return Promise.resolve(cookiesOptions);
};

import {LogEventType} from '../../constants/internal';
import {createClientFunction} from '../../createClientFunction';

import {assertValueIsDefined} from '../asserts';
import {log} from '../log';

import type {ClientFunction, CookieHeaderString} from '../../types/internal';

let clientGetDocumentCookie: ClientFunction<[], CookieHeaderString> | undefined;

/**
 * Get current document cookie.
 */
export const getDocumentCookie = async (): Promise<CookieHeaderString> => {
  if (clientGetDocumentCookie === undefined) {
    clientGetDocumentCookie = createClientFunction<[], CookieHeaderString>(
      () => document.cookie as CookieHeaderString,
      {name: 'getDocumentCookie'},
    );
  }

  const cookie = await clientGetDocumentCookie();

  assertValueIsDefined(cookie, 'cookie is defined');

  log('Get current document cookie', {cookie}, LogEventType.InternalUtil);

  return cookie;
};

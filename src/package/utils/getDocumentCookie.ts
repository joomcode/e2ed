import {LogEventType} from '../constants/internal';
import {createClientFunction} from '../createClientFunction';

import {assertValueIsDefined} from './asserts';
import {log} from './log';

import type {CookieHeaderString} from '../types/internal';

const clientGetDocumentCookie = createClientFunction<[], CookieHeaderString>(
  () => document.cookie as CookieHeaderString,
  {name: 'getDocumentCookie', timeout: 500},
);

/**
 * Get current document cookie.
 */
export const getDocumentCookie = async (): Promise<CookieHeaderString> => {
  const cookie = await clientGetDocumentCookie();

  assertValueIsDefined(cookie, 'cookie is defined');

  await log('Get current document cookie', {cookie}, LogEventType.InternalUtil);

  return cookie;
};

import {LogEventType} from '../constants/internal';
import {createClientFunction} from '../createClientFunction';

import {assertValueIsDefined} from './asserts';
import {log} from './log';

import type {Url} from '../types/internal';

const clientGetCurrentUrl = createClientFunction<[], Url>(() => window.location.href as Url, {
  name: 'getCurrentUrl',
});

/**
 * Get current page url.
 */
export const getCurrentUrl = async (): Promise<Url> => {
  const url = await clientGetCurrentUrl();

  assertValueIsDefined(url, 'url is defined');

  log('Get current page url', {url}, LogEventType.InternalUtil);

  return url;
};

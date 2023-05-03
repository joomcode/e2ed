import {LogEventType} from '../../constants/internal';
import {createClientFunction} from '../../createClientFunction';

import {assertValueIsDefined} from '../asserts';
import {log} from '../log';

import type {Url} from '../../types/internal';

const clientGetDocumentUrl = createClientFunction<[], Url>(() => document.URL as Url, {
  name: 'getDocumentUrl',
});

/**
 * Get current document url.
 */
export const getDocumentUrl = async (): Promise<Url> => {
  const url = await clientGetDocumentUrl();

  assertValueIsDefined(url, 'url is defined');

  log('Get current document url', {url}, LogEventType.InternalUtil);

  return url;
};

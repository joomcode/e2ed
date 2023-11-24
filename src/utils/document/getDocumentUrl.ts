import {LogEventType} from '../../constants/internal';
import {createClientFunction} from '../../createClientFunction';

import {assertValueIsDefined} from '../asserts';
import {log} from '../log';

import type {ClientFunction, Url} from '../../types/internal';

let clientGetDocumentUrl: ClientFunction<[], Url> | undefined;

/**
 * Get current document url.
 */
export const getDocumentUrl = async (): Promise<Url> => {
  if (clientGetDocumentUrl === undefined) {
    clientGetDocumentUrl = createClientFunction<[], Url>(() => document.URL as Url, {
      name: 'getDocumentUrl',
    });
  }

  const url = await clientGetDocumentUrl();

  assertValueIsDefined(url, 'url is defined');

  log('Get current document url', {url}, LogEventType.InternalUtil);

  return url;
};

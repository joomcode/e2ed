import {LogEventType} from '../../constants/internal';
import {createClientFunction} from '../../createClientFunction';

import {assertValueIsDefined} from '../asserts';
import {log} from '../log';

import type {ClientFunction} from '../../types/internal';

let clientGetDocumentTitle: ClientFunction<[], string> | undefined;

/**
 * Get current document title.
 */
export const getDocumentTitle = async (): Promise<string> => {
  if (clientGetDocumentTitle === undefined) {
    clientGetDocumentTitle = createClientFunction<[], string>(() => document.title, {
      name: 'getDocumentTitle',
    });
  }

  const title = await clientGetDocumentTitle();

  assertValueIsDefined(title, 'title is defined');

  log('Get current document title', {title}, LogEventType.InternalUtil);

  return title;
};

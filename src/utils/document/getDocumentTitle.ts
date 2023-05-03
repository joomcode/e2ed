import {LogEventType} from '../../constants/internal';
import {createClientFunction} from '../../createClientFunction';

import {assertValueIsDefined} from '../asserts';
import {log} from '../log';

const clientGetDocumentTitle = createClientFunction<[], string>(() => document.title, {
  name: 'getDocumentTitle',
});

/**
 * Get current document title.
 */
export const getDocumentTitle = async (): Promise<string> => {
  const title = await clientGetDocumentTitle();

  assertValueIsDefined(title, 'title is defined');

  log('Get current document title', {title}, LogEventType.InternalUtil);

  return title;
};

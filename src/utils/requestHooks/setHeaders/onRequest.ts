import {LogEventType, RESOLVED_PROMISE} from '../../../constants/internal';

import {log} from '../../log';
import {setReadonlyProperty} from '../../setReadonlyProperty';

import {applyHeadersMapper} from '../applyHeadersMapper';

import type {Headers, MapOptions, RequestHookRequestEvent, Url} from '../../../types/internal';

/**
 * `onRequest` event handler.
 * Maps request headers.
 * @internal
 */
export const onRequest = (
  event: RequestHookRequestEvent,
  options: MapOptions,
  url: Url,
): Promise<void> => {
  if (options.mapRequestHeaders === undefined) {
    return RESOLVED_PROMISE;
  }

  const {requestOptions} = event;
  const {headers = {}} = requestOptions;

  applyHeadersMapper(headers as Headers, options.mapRequestHeaders);

  setReadonlyProperty(requestOptions, 'headers', headers);

  log(`Map request headers for ${url}`, {headers}, LogEventType.InternalUtil);

  return RESOLVED_PROMISE;
};

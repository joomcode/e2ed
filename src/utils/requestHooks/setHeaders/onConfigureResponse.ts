/* eslint-disable no-underscore-dangle */

import {LogEventType, REQUEST_HOOK_CONTEXT_KEY} from '../../../constants/internal';

import {assertValueIsBoolean, assertValueIsDefined} from '../../asserts';
import {log} from '../../log';
import {setReadonlyProperty} from '../../setReadonlyProperty';

import {applyHeadersMapper} from '../applyHeadersMapper';
import {applyHeadersMapperOnCdpMode} from '../applyHeadersMapperOnCdpMode';
import {getHeadersFromHeaderEntries} from '../getHeadersFromHeaderEntries';

import type {
  Headers,
  MapOptions,
  RequestHookConfigureResponseEvent,
  Url,
} from '../../../types/internal';

/**
 * `_onConfigureResponse` event handler.
 * Maps response headers.
 * @internal
 */
export const onConfigureResponse = (
  event: RequestHookConfigureResponseEvent,
  options: MapOptions,
  url: Url,
): void => {
  if (options.mapResponseHeaders === undefined) {
    return;
  }

  const requestHookContext = event[REQUEST_HOOK_CONTEXT_KEY];

  let headers: Headers | undefined;

  const {destRes} = requestHookContext?._ctx ?? {};

  if (destRes) {
    ({headers} = destRes);

    assertValueIsDefined(headers, 'headers is defined');

    applyHeadersMapper(headers, options.mapResponseHeaders);
  } else {
    assertValueIsDefined(requestHookContext, 'requestHookContext is defined');

    const {headersModified} = requestHookContext;

    assertValueIsBoolean(headersModified, 'headersModified is boolean');

    const {responseHeaders} = requestHookContext._event ?? {};

    assertValueIsDefined(responseHeaders, 'responseHeaders is defined');

    headers = getHeadersFromHeaderEntries(responseHeaders);

    applyHeadersMapperOnCdpMode(
      headers,
      options.mapResponseHeaders,
      responseHeaders as (typeof responseHeaders)[number][],
    );

    headers = getHeadersFromHeaderEntries(responseHeaders);

    setReadonlyProperty(requestHookContext, 'headersModified', true);
  }

  log(`Map response headers for ${url}`, {headers}, LogEventType.InternalUtil);
};

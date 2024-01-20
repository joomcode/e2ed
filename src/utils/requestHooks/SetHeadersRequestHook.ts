/* eslint-disable no-underscore-dangle */

import {
  INCLUDE_HEADERS_IN_RESPONSE_EVENT,
  LogEventType,
  REQUEST_HOOK_CONTEXT_KEY,
  RESOLVED_PROMISE,
} from '../../constants/internal';
import {testController} from '../../testController';

import {assertValueIsDefined} from '../asserts';
import {log} from '../log';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {applyHeadersMapper} from './applyHeadersMapper';
import {applyHeadersMapperByModifiers} from './applyHeadersMapperByModifiers';
import {getHeadersFromHeaderEntries} from './getHeadersFromHeaderEntries';
import {RequestHookWithEvents} from './RequestHookWithEvents';

import type {
  Headers,
  MapOptions,
  RequestHookConfigureResponseEvent,
  RequestHookRequestEvent,
  Url,
} from '../../types/internal';

/**
 * Request hook that set mapped headers for request and response
 * for concrete url.
 */
export class SetHeadersRequestHook extends RequestHookWithEvents {
  constructor(
    private readonly url: Url,
    private readonly options: MapOptions,
  ) {
    super([url], INCLUDE_HEADERS_IN_RESPONSE_EVENT);
  }

  override onRequest(event: RequestHookRequestEvent): Promise<void> {
    const {requestOptions} = event;
    const {headers = {}} = requestOptions;

    applyHeadersMapper(headers as Headers, this.options.mapRequestHeaders);

    setReadonlyProperty(requestOptions, 'headers', headers);

    log(`Map request headers for ${this.url}`, {headers}, LogEventType.InternalUtil);

    return RESOLVED_PROMISE;
  }

  override async onResponse(): Promise<void> {
    await testController.removeRequestHooks(this);
  }

  override async _onConfigureResponse(event: RequestHookConfigureResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const requestHookContext = event[REQUEST_HOOK_CONTEXT_KEY];

    let headers: Headers | undefined;

    const {destRes} = requestHookContext?._ctx ?? {};

    if (destRes) {
      ({headers} = destRes);

      assertValueIsDefined(headers, 'headers is defined');

      applyHeadersMapper(headers, this.options.mapResponseHeaders);
    } else {
      const {responseHeaders} = requestHookContext?._event ?? {};
      const headersModifiers = event._modifyResponseFunctions;

      assertValueIsDefined(responseHeaders, 'responseHeaders is defined');

      headers = getHeadersFromHeaderEntries(responseHeaders);

      applyHeadersMapperByModifiers(headers, this.options.mapResponseHeaders, headersModifiers);
    }

    log(`Map response headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }
}

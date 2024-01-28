/* eslint-disable no-underscore-dangle */

import {
  INCLUDE_HEADERS_IN_RESPONSE_EVENT,
  LogEventType,
  REQUEST_HOOK_CONTEXT_KEY,
  RESOLVED_PROMISE,
} from '../../constants/internal';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {testController} from '../../testController';

import {assertValueIsBoolean, assertValueIsDefined} from '../asserts';
import {log} from '../log';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {applyHeadersMapper} from './applyHeadersMapper';
import {applyHeadersMapperOnCdpMode} from './applyHeadersMapperOnCdpMode';
import {getHeadersFromHeaderEntries} from './getHeadersFromHeaderEntries';
import {RequestHookToWaitForEvents} from './RequestHookToWaitForEvents';
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
    const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);
    let wasCalled = false;

    const predicate = (request: Readonly<{url?: string}>): boolean => {
      if (request.url === url) {
        wasCalled = true;

        return true;
      }

      if (wasCalled && url in waitForEventsState.redirects) {
        return waitForEventsState.redirects[url] === request.url;
      }

      return false;
    };

    super(predicate, INCLUDE_HEADERS_IN_RESPONSE_EVENT);
  }

  override onRequest(event: RequestHookRequestEvent): Promise<void> {
    if (this.options.mapRequestHeaders === undefined) {
      return RESOLVED_PROMISE;
    }

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

    if (this.options.mapResponseHeaders === undefined) {
      return;
    }

    const requestHookContext = event[REQUEST_HOOK_CONTEXT_KEY];

    let headers: Headers | undefined;

    const {destRes} = requestHookContext?._ctx ?? {};

    if (destRes) {
      ({headers} = destRes);

      assertValueIsDefined(headers, 'headers is defined');

      applyHeadersMapper(headers, this.options.mapResponseHeaders);
    } else {
      assertValueIsDefined(requestHookContext, 'requestHookContext is defined');

      const {headersModified} = requestHookContext;

      assertValueIsBoolean(headersModified, 'headersModified is boolean');

      const {responseHeaders} = requestHookContext._event ?? {};

      assertValueIsDefined(responseHeaders, 'responseHeaders is defined');

      headers = getHeadersFromHeaderEntries(responseHeaders);

      applyHeadersMapperOnCdpMode(
        headers,
        this.options.mapResponseHeaders,
        responseHeaders as (typeof responseHeaders)[number][],
      );

      headers = getHeadersFromHeaderEntries(responseHeaders);

      setReadonlyProperty(requestHookContext, 'headersModified', true);
    }

    log(`Map response headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }
}

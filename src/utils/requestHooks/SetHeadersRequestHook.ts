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
import {RequestHookWithEvents} from './RequestHookWithEvents';

import type {
  Headers,
  MapOptions,
  RequestHookConfigureResponseEvent,
  RequestHookRequestEvent,
  Url,
} from '../../types/internal';

/**
 * RequestHook that set mapped headers for request and response
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
    const {headers} = requestHookContext.destRes;

    assertValueIsDefined(headers, 'headers is defined', {requestHookConfigureResponseEvent: event});

    applyHeadersMapper(headers, this.options.mapResponseHeaders);

    log(`Map response headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }
}

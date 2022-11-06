import {
  INCLUDE_HEADERS_IN_RESPONSE_EVENT,
  LogEventType,
  REQUEST_HOOK_CONTEXT_KEY,
} from '../../constants/internal';

import {log} from '../log';

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
  constructor(private readonly url: Url, private readonly options: MapOptions) {
    super([url], INCLUDE_HEADERS_IN_RESPONSE_EVENT);
  }

  override async onRequest(event: RequestHookRequestEvent): Promise<void> {
    const {requestOptions} = event;
    const {headers = {}} = requestOptions;

    applyHeadersMapper(headers as Headers, this.options.mapRequestHeaders);

    (requestOptions as {headers: Headers}).headers = headers;

    await log(`Map request headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }

  override async _onConfigureResponse(event: RequestHookConfigureResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const requestHookContext = event[REQUEST_HOOK_CONTEXT_KEY];
    const {headers = {}} = requestHookContext.destRes;

    applyHeadersMapper(headers, this.options.mapResponseHeaders);

    (requestHookContext.destRes as {headers: Headers}).headers = headers;

    await log(`Map response headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }
}

import {LogEventType} from '../../constants/internal';

import {log} from '../log';

import {applyHeadersMapper} from './applyHeadersMapper';
import {RequestHookWithEvents} from './RequestHookWithEvents';

import type {
  Headers,
  MapOptions,
  RequestHookRequestEvent,
  RequestHookResponseEvent,
  Url,
} from '../../types/internal';

/**
 * RequestHook that set mapped headers for request and response
 * for concrete url.
 */
export class SetHeadersRequestHook extends RequestHookWithEvents {
  constructor(private readonly url: Url, private readonly options: MapOptions) {
    super([url]);
  }

  override async onRequest(event: RequestHookRequestEvent): Promise<void> {
    const {headers = {}} = event.requestOptions;

    applyHeadersMapper(headers as Headers, this.options.mapRequestHeaders);

    await log(`Map request headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }

  override async _onConfigureResponse(event: RequestHookResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const {headers = {}} = event._requestContext.destRes;

    applyHeadersMapper(headers, this.options.mapResponseHeaders);

    await log(`Map response headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }
}

import {AsyncLocalStorage} from 'node:async_hooks';

import {assertValueIsDefined} from '../asserts';
import {getRouteInstanceFromUrl} from '../getRouteInstanceFromUrl';

import type {URL} from 'node:url';

import type {Url, WebSocketMockState} from '../../types/internal';

/**
 * Get `requestsFilter` function for WebSocket mocks by `WebSocketMockState`.
 * @internal
 */
export const getRequestsFilter = ({
  optionsByRoute,
  optionsWithRouteByUrl,
}: WebSocketMockState): ((urlObject: URL) => boolean) =>
  AsyncLocalStorage.bind((urlObject) => {
    assertValueIsDefined(optionsByRoute, 'optionsByRoute is defined', {urlObject});

    const url = urlObject.href as Url;

    for (const [Route, {skipLogs, webSocketMockFunction}] of optionsByRoute) {
      const maypeRouteWithRouteParams = getRouteInstanceFromUrl(url, Route);

      if (maypeRouteWithRouteParams === undefined) {
        // eslint-disable-next-line no-param-reassign
        optionsWithRouteByUrl[url] = undefined;

        continue;
      }

      const {route} = maypeRouteWithRouteParams;

      // eslint-disable-next-line no-param-reassign
      optionsWithRouteByUrl[url] = {route, skipLogs, webSocketMockFunction};

      return true;
    }

    return false;
  });

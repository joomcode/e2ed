import {AsyncLocalStorage} from 'node:async_hooks';

import {LogEventStatus, LogEventType} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {getBodyAsString} from '../http';
import {log} from '../log';
import {parseValueAsJsonIfNeeded} from '../parse';

import type {WebSocketRoute as PlaywrightWebSocketRoute} from '@playwright/test';

import type {Url, WebSocketMockState} from '../../types/internal';

/**
 * Get `setResponse` function for WebSocket mocks by `WebSocketMockState`.
 * @internal
 */
export const getSetResponse = ({
  optionsWithRouteByUrl,
}: WebSocketMockState): ((playwrightRoute: PlaywrightWebSocketRoute) => void) =>
  AsyncLocalStorage.bind((playwrightRoute) => {
    const url = playwrightRoute.url() as Url;
    const optionsWithRoute = optionsWithRouteByUrl[url];

    assertValueIsDefined(optionsWithRoute, 'optionsWithRoute is defined', {url});

    const {skipLogs, route, webSocketMockFunction} = optionsWithRoute;
    const isRequestBodyInJsonFormat = route.getIsRequestBodyInJsonFormat();
    const isResponseBodyInJsonFormat = route.getIsResponseBodyInJsonFormat();

    playwrightRoute.onMessage(
      AsyncLocalStorage.bind(async (message) => {
        const {value: request, hasParseError} = parseValueAsJsonIfNeeded(
          String(message),
          isRequestBodyInJsonFormat,
        );

        if (hasParseError && skipLogs !== true) {
          log(
            'WebSocket message is not in JSON format',
            {logEventStatus: LogEventStatus.Failed, message, url},
            LogEventType.InternalUtil,
          );
        }

        const response = await webSocketMockFunction(route.routeParams, request);

        const responseAsString = getBodyAsString(response, isResponseBodyInJsonFormat);

        playwrightRoute.send(responseAsString);

        if (skipLogs !== true) {
          log(
            `A mock was applied to the WebSocket route "${route.constructor.name}"`,
            {request, response, route, webSocketMockFunction},
            LogEventType.InternalUtil,
          );
        }
      }),
    );
  });

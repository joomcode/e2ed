import {LogEventType} from '../../constants/internal';
import {getFullMocksState} from '../../context/fullMocks';
import {getWebSocketMockState} from '../../context/webSocketMockState';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {log} from '../../utils/log';
import {getRequestsFilter, getSetResponse} from '../../utils/mockWebSocketRoute';
import {setReadonlyProperty} from '../../utils/object';

import type {
  WebSocketMockFunction,
  WebSocketRouteClassTypeWithGetParamsFromUrl,
} from '../../types/internal';

/**
 * Mock WebSocket for some API route.
 * Applicable only for routes with the `getParamsFromUrlOrThrow` method.
 * The mock is applied to a WebSocket that matches the route by url
 * (by methods `getParamsFromUrlOrThrow` and `isMatchUrl`).
 */
export const mockWebSocketRoute = async <RouteParams, SomeRequest, SomeResponse>(
  Route: WebSocketRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  webSocketMockFunction: WebSocketMockFunction<RouteParams, SomeRequest, SomeResponse>,
  {skipLogs = false}: {skipLogs?: boolean} = {},
): Promise<void> => {
  setCustomInspectOnFunction(webSocketMockFunction);

  const webSocketMockState = getWebSocketMockState();

  if (!webSocketMockState.isMocksEnabled) {
    return;
  }

  const fullMocksState = getFullMocksState();

  if (fullMocksState?.appliedMocks !== undefined) {
    setReadonlyProperty(webSocketMockState, 'isMocksEnabled', false);
  }

  let {optionsByRoute} = webSocketMockState;

  if (optionsByRoute === undefined) {
    optionsByRoute = new Map();

    setReadonlyProperty(webSocketMockState, 'optionsByRoute', optionsByRoute);

    const requestsFilter = getRequestsFilter(webSocketMockState);

    setReadonlyProperty(webSocketMockState, 'requestsFilter', requestsFilter);
  }

  if (optionsByRoute.size === 0) {
    const {requestsFilter} = webSocketMockState;

    assertValueIsDefined(requestsFilter, 'requestsFilter is defined', {
      routeName: Route.name,
      webSocketMockState,
    });

    const page = getPlaywrightPage();

    const setResponse = getSetResponse(webSocketMockState);

    await page.routeWebSocket(requestsFilter, setResponse);
  }

  optionsByRoute.set(Route, {
    skipLogs,
    webSocketMockFunction: webSocketMockFunction as WebSocketMockFunction,
  });

  if (skipLogs !== true) {
    log(
      `Mock WebSocket for route "${Route.name}"`,
      {webSocketMockFunction},
      LogEventType.InternalAction,
    );
  }
};

import {LogEventType} from '../../constants/internal';
import {getWebSocketMockState} from '../../context/webSocketMockState';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {log} from '../../utils/log';

import type {
  WebSocketMockFunction,
  WebSocketRouteClassTypeWithGetParamsFromUrl,
} from '../../types/internal';

/**
 * Unmock WebSocket (remove mock, if any) for some WebSocket route.
 */
export const unmockWebSocketRoute = async <RouteParams, SomeRequest, SomeResponse>(
  Route: WebSocketRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
): Promise<void> => {
  const webSocketMockState = getWebSocketMockState();
  const {optionsByRoute, requestsFilter} = webSocketMockState;
  let webSocketMockFunction: WebSocketMockFunction | undefined;
  let routeWasMocked = false;
  let skipLogs: boolean | undefined;

  if (optionsByRoute?.has(Route)) {
    const options = optionsByRoute.get(Route);

    webSocketMockFunction = options?.webSocketMockFunction;
    skipLogs = options?.skipLogs;

    routeWasMocked = true;
    optionsByRoute.delete(Route);
  }

  if (optionsByRoute?.size === 0) {
    assertValueIsDefined(requestsFilter, 'requestsFilter is defined', {
      routeName: Route.name,
      routeWasMocked,
    });

    const page = getPlaywrightPage();

    await page.unroute(requestsFilter);
  }

  if (webSocketMockFunction) {
    setCustomInspectOnFunction(webSocketMockFunction);
  }

  if (skipLogs !== true) {
    log(
      `Unmock WebSocket for route "${Route.name}"`,
      {routeWasMocked, webSocketMockFunction},
      LogEventType.InternalAction,
    );
  }
};

import {LogEventType} from '../../constants/internal';
import {getWebSocketMockState} from '../../context/webSocketMockState';
import {step} from '../../step';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {setCustomInspectOnFunction} from '../../utils/fn';

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

  if (webSocketMockFunction) {
    setCustomInspectOnFunction(webSocketMockFunction);
  }

  await step(
    `Unmock WebSocket for route "${Route.name}"`,
    async () => {
      if (optionsByRoute?.size === 0) {
        assertValueIsDefined(requestsFilter, 'requestsFilter is defined', {
          routeName: Route.name,
          routeWasMocked,
        });

        const page = getPlaywrightPage();

        await page.unroute(requestsFilter);
      }
    },
    {
      payload: {routeWasMocked, webSocketMockFunction},
      skipLogs: skipLogs ?? false,
      type: LogEventType.InternalAction,
    },
  );
};

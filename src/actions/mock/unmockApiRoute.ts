import {LogEventType} from '../../constants/internal';
import {getApiMockState} from '../../context/apiMockState';
import {testController} from '../../testController';
import {assertValueIsDefined} from '../../utils/asserts';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {log} from '../../utils/log';

import type {
  ApiMockFunction,
  ApiRouteClassTypeWithGetParamsFromUrl,
  Request,
  Response,
} from '../../types/internal';

/**
 * Unmock API (remove mock, if any) for some API route.
 */
export const unmockApiRoute = async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
): Promise<void> => {
  const apiMockState = getApiMockState();
  const {apiMock, functionByRoute} = apiMockState;
  let apiMockFunction: ApiMockFunction | undefined;
  let routeWasMocked = false;

  if (functionByRoute?.has(Route)) {
    apiMockFunction = functionByRoute.get(Route);
    routeWasMocked = true;
    functionByRoute.delete(Route);
  }

  if (functionByRoute?.size === 0) {
    assertValueIsDefined(apiMock, 'apiMock is defined', {routeName: Route.name, routeWasMocked});

    await testController.removeRequestHooks(apiMock);
  }

  if (apiMockFunction) {
    setCustomInspectOnFunction(apiMockFunction);
  }

  log(
    `Unmock API for route "${Route.name}"`,
    {apiMockFunction, routeWasMocked},
    LogEventType.InternalAction,
  );
};

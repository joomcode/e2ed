import {LogEventType} from '../../constants/internal';
import {getApiMockState} from '../../context/apiMockState';
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
  const {functionByRoute} = apiMockState;
  let apiMockFunction: ApiMockFunction | undefined;
  let routeWasMocked = false;

  if (functionByRoute?.has(Route)) {
    apiMockFunction = functionByRoute.get(Route);
    routeWasMocked = true;
    functionByRoute.delete(Route);
  }

  await log(
    `Unmock API for route "${Route.name}"`,
    {apiMockFunctionCode: apiMockFunction?.toString(), routeWasMocked},
    LogEventType.InternalCore,
  );
};

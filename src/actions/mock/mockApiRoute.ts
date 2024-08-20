import {LogEventType} from '../../constants/internal';
import {getApiMockState} from '../../context/apiMockState';
import {getFullMocksState} from '../../context/fullMocks';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {log} from '../../utils/log';
import {getRequestsFilter, getSetResponse} from '../../utils/mockApiRoute';
import {setReadonlyProperty} from '../../utils/setReadonlyProperty';

import type {
  ApiMockFunction,
  ApiRouteClassTypeWithGetParamsFromUrl,
  Request,
  Response,
} from '../../types/internal';

/**
 * Mock API for some API route.
 * Applicable only for routes with the `getParamsFromUrl` method.
 * The mock is applied to a request that matches the route by url
 * (by methods `getParamsFromUrl` and `isMatchUrl`) and by HTTP method (by `getMethod`).
 */
export const mockApiRoute = async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  apiMockFunction: ApiMockFunction<RouteParams, SomeRequest, SomeResponse>,
  {skipLogs = false}: {skipLogs?: boolean} = {},
): Promise<void> => {
  setCustomInspectOnFunction(apiMockFunction);

  const apiMockState = getApiMockState();

  if (!apiMockState.isMocksEnabled) {
    return;
  }

  const fullMocksState = getFullMocksState();

  if (fullMocksState?.appliedMocks !== undefined) {
    setReadonlyProperty(apiMockState, 'isMocksEnabled', false);
  }

  let {optionsByRoute} = apiMockState;

  if (optionsByRoute === undefined) {
    optionsByRoute = new Map();

    setReadonlyProperty(apiMockState, 'optionsByRoute', optionsByRoute);

    const requestsFilter = getRequestsFilter(apiMockState);

    setReadonlyProperty(apiMockState, 'requestsFilter', requestsFilter);
  }

  if (optionsByRoute.size === 0) {
    const {requestsFilter} = apiMockState;

    assertValueIsDefined(requestsFilter, 'requestsFilter is defined', {
      apiMockState,
      routeName: Route.name,
    });

    const page = getPlaywrightPage();

    const setResponse = getSetResponse(apiMockState);

    await page.route(requestsFilter, setResponse);
  }

  optionsByRoute.set(Route, {apiMockFunction: apiMockFunction as ApiMockFunction, skipLogs});

  if (skipLogs !== true) {
    log(`Mock API for route "${Route.name}"`, {apiMockFunction}, LogEventType.InternalAction);
  }
};

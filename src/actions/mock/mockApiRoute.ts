import {LogEventType} from '../../constants/internal';
import {getApiMockState} from '../../context/apiMockState';
import {getFullMocksState} from '../../context/fullMocks';
import {step} from '../../step';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getRequestsFilter, getSetResponse} from '../../utils/mockApiRoute';
import {setReadonlyProperty} from '../../utils/object';

import type {
  ApiMockFunction,
  ApiRouteClassTypeWithGetParamsFromUrl,
  Request,
  Response,
} from '../../types/internal';

/**
 * Mock API for some API route.
 * Applicable only for routes with the `getParamsFromUrlOrThrow` method.
 * The mock is applied to a request that matches the route by url
 * (by methods `getParamsFromUrlOrThrow` and `isMatchUrl`).
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

  await step(
    `Mock API for route "${Route.name}"`,
    async () => {
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
    },
    {payload: {apiMockFunction}, skipLogs, type: LogEventType.InternalAction},
  );
};

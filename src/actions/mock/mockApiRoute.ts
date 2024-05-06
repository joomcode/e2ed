import {RequestMock} from 'testcafe-without-typecheck';

import {LogEventType} from '../../constants/internal';
import {getApiMockState} from '../../context/apiMockState';
import {getFullMocksState} from '../../context/fullMocks';
import {testController} from '../../testController';
import {assertValueIsDefined} from '../../utils/asserts';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {log} from '../../utils/log';
import {getRequestsFilter, getSetResponse} from '../../utils/mockApiRoute';
import {setReadonlyProperty} from '../../utils/setReadonlyProperty';
import {wrapInTestRunTracker} from '../../utils/testRun';

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

    let requestMock = RequestMock();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    requestMock.onRequestTo = wrapInTestRunTracker(requestMock.onRequestTo);

    requestMock = requestMock.onRequestTo(getRequestsFilter(apiMockState));

    // eslint-disable-next-line @typescript-eslint/unbound-method
    requestMock.respond = wrapInTestRunTracker(requestMock.respond);

    const apiMock = requestMock.respond(getSetResponse(apiMockState));

    setReadonlyProperty(apiMockState, 'apiMock', apiMock);
  }

  if (optionsByRoute.size === 0) {
    const {apiMock} = apiMockState;

    assertValueIsDefined(apiMock, 'apiMock is defined', {apiMockState, routeName: Route.name});

    await testController.addRequestHooks(apiMock);
  }

  optionsByRoute.set(Route, {apiMockFunction: apiMockFunction as ApiMockFunction, skipLogs});

  if (skipLogs !== true) {
    log(`Mock API for route "${Route.name}"`, {apiMockFunction}, LogEventType.InternalAction);
  }
};

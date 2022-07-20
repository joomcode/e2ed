import {RequestMock} from 'testcafe-without-typecheck';

import {LogEventType} from './constants/internal';
import {log} from './utils/log';
import {getRequestsFilter, getSetResponse} from './utils/mockApi';
import {testController} from './testController';

import type {
  ApiMockFunction,
  ApiMockState,
  ApiRouteClassTypeWithGetParamsFromUrl,
  Request,
  Response,
} from './types/internal';

const apiMockState: ApiMockState = {
  functionAndRouteByUrl: {},
  functionByRoute: undefined,
};

/**
 * Mock API for some API route.
 */
export const mockApi = async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  apiMockFunction: ApiMockFunction<RouteParams, SomeRequest, SomeResponse>,
): Promise<void> => {
  let {functionByRoute} = apiMockState;

  if (functionByRoute === undefined) {
    functionByRoute = new Map();
    // @ts-expect-error: property functionByRoute is readonly
    apiMockState.functionByRoute = functionByRoute;

    const apiMock = RequestMock()
      .onRequestTo(getRequestsFilter(apiMockState))
      .respond(getSetResponse(apiMockState));

    await testController.addRequestHooks(apiMock);
  }

  functionByRoute.set(Route, apiMockFunction as unknown as ApiMockFunction);

  await log(`Mock API for route "${Route.name}"`, {apiMockFunction}, LogEventType.InternalCore);
};

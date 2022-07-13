import {RequestMock} from 'testcafe-without-typecheck';

import {getRequestsFilter, getSetResponse} from './utils/apiMock';
import {testController} from './testController';

import type {
  ApiMockFunction,
  ApiMockState,
  ApiRouteWithGetParamsFromUrl,
  Request,
  Response,
} from './types/internal';

const apiMockState: ApiMockState = {
  functionAndRouteParamsByUrl: {},
  functionByRoute: undefined,
};

/**
 * Add mock for some API route.
 */
export const doApiMock = async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
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
};

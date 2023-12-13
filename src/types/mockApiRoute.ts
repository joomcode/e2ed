import type {Inner} from 'testcafe-without-typecheck';

import type {ApiRoute} from '../ApiRoute';

import type {Request, Response, Url} from './http';
import type {ApiRouteClassTypeWithGetParamsFromUrl} from './routes';

/**
 * Object with routeParams and apiMockFunction.
 * @internal
 */
type MockFunctionAndRoute = Readonly<{
  apiMockFunction: ApiMockFunction;
  route: ApiRoute<unknown>;
}>;

/**
 * API mock function, that map request to mocked response.
 */
export type ApiMockFunction<
  RouteParams = unknown,
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> = (
  routeParams: RouteParams,
  request: SomeRequest,
) => Partial<SomeResponse> | Promise<Partial<SomeResponse>>;

/**
 * Internal state of mockApiRoute/unmockApiRoute.
 * @internal
 */
export type ApiMockState = Readonly<{
  apiMock: Inner.RequestMock | undefined;
  functionAndRouteByUrl: Record<Url, MockFunctionAndRoute | undefined>;
  functionByRoute: Map<ApiRouteClassTypeWithGetParamsFromUrl, ApiMockFunction> | undefined;
}>;

import type {Request, Response, Url} from './http';
import type {ApiRouteWithGetParamsFromUrl} from './routes';

/**
 * Object with routeParams and apiMockFunction.
 * @internal
 */
type RouteParamsAndApiMockFunction = Readonly<{
  apiMockFunction: ApiMockFunction;
  routeParams: unknown;
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
) => Promise<Partial<SomeResponse>> | Partial<SomeResponse>;

/**
 * Internal state of doApiMock.
 * @internal
 */
export type ApiMockState = Readonly<{
  functionAndRouteParamsByUrl: Record<Url, RouteParamsAndApiMockFunction | undefined>;
  functionByRoute: Map<ApiRouteWithGetParamsFromUrl, ApiMockFunction> | undefined;
}>;

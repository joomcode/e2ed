import type {URL} from 'node:url';

import type {ApiRoute} from '../ApiRoute';

import type {Request, Response, Url} from './http';
import type {MaybePromise} from './promise';
import type {ApiRouteClassTypeWithGetParamsFromUrl} from './routes';

/**
 * Mock option with mocked route.
 * @internal
 */
type MockOptionsWithRoute = MockOptions & Readonly<{route: ApiRoute<unknown>}>;

/**
 * Mock option (`apiMockFunction` and `skipLogs`).
 */
type MockOptions = Readonly<{apiMockFunction: ApiMockFunction; skipLogs: boolean}>;

/**
 * API mock function, that map request to mocked response.
 */
export type ApiMockFunction<
  RouteParams = unknown,
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> = (routeParams: RouteParams, request: SomeRequest) => MaybePromise<Partial<SomeResponse>>;

/**
 * Internal state of `mockApiRoute`/`unmockApiRoute`.
 * @internal
 */
export type ApiMockState = Readonly<{
  isMocksEnabled: boolean;
  optionsByRoute: Map<ApiRouteClassTypeWithGetParamsFromUrl, MockOptions> | undefined;
  optionsWithRouteByUrl: Record<Url, MockOptionsWithRoute | undefined>;
  requestsFilter: ((urlObject: URL) => boolean) | undefined;
}>;

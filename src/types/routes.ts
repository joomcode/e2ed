import type {ApiRoute} from '../ApiRoute';
import type {WebSocketRoute} from '../WebSocketRoute';

import type {Request, Response} from './http';
import type {Any, ZeroOrOneArg} from './utils';

/**
 * API Route class type by route parameters type.
 */
export type ApiRouteClassType<
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
> = {
  prototype: ApiRoute<RouteParams, SomeRequest, SomeResponse>;
  new (...args: ZeroOrOneArg<RouteParams>): ApiRoute<RouteParams, SomeRequest, SomeResponse>;
};

/**
 * API Route class with static method `getParamsFromUrlOrThrow`.
 */
export type ApiRouteClassTypeWithGetParamsFromUrl<
  RouteParams = Any,
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> = ApiRouteClassType<RouteParams, SomeRequest, SomeResponse> &
  Readonly<{
    getParamsFromUrlOrThrow: Exclude<(typeof ApiRoute)['getParamsFromUrlOrThrow'], undefined>;
  }>;

/**
 * WebSocket Route class type by route parameters type.
 */
export type WebSocketRouteClassType<RouteParams, SomeRequest, SomeResponse> = {
  prototype: WebSocketRoute<RouteParams, SomeRequest, SomeResponse>;
  new (...args: ZeroOrOneArg<RouteParams>): WebSocketRoute<RouteParams, SomeRequest, SomeResponse>;
};

/**
 * WebSocket Route class with static method `getParamsFromUrlOrThrow`.
 */
export type WebSocketRouteClassTypeWithGetParamsFromUrl<
  RouteParams = Any,
  SomeRequest = unknown,
  SomeResponse = unknown,
> = WebSocketRouteClassType<RouteParams, SomeRequest, SomeResponse> &
  Readonly<{
    getParamsFromUrlOrThrow: Exclude<(typeof WebSocketRoute)['getParamsFromUrlOrThrow'], undefined>;
  }>;

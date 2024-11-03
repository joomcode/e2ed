import type {ApiRoute} from '../ApiRoute';

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
 * API Route class with static method getParamsFromUrlOrThrow.
 */
export type ApiRouteClassTypeWithGetParamsFromUrl<
  RouteParams = Any,
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> = ApiRouteClassType<RouteParams, SomeRequest, SomeResponse> &
  Readonly<{
    getParamsFromUrlOrThrow: Exclude<(typeof ApiRoute)['getParamsFromUrlOrThrow'], undefined>;
  }>;

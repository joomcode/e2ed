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
  new (...args: ZeroOrOneArg<RouteParams>): ApiRoute<RouteParams, SomeRequest, SomeResponse>;
  prototype: ApiRoute<RouteParams, SomeRequest, SomeResponse>;
};

/**
 * API Route class with static method getParamsFromUrl.
 */
export type ApiRouteClassTypeWithGetParamsFromUrl<
  RouteParams = Any,
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> = ApiRouteClassType<RouteParams, SomeRequest, SomeResponse> &
  Readonly<{
    getParamsFromUrl: Exclude<typeof ApiRoute['getParamsFromUrl'], undefined>;
  }>;

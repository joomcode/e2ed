import type {ApiRoute} from '../ApiRoute';

import type {ZeroOrOneArg} from './utils';

/**
 * API Route class type by route parameters type.
 */
type ApiRouteClassType<RouteParams> = {
  new (...args: ZeroOrOneArg<RouteParams>): ApiRoute<RouteParams>;
  prototype: ApiRoute<RouteParams>;
};

/**
 * API Route class with static method getParamsFromUrl.
 */
export type ApiRouteWithGetParamsFromUrl<RouteParams> = ApiRouteClassType<RouteParams> &
  Readonly<{
    getParamsFromUrl: Exclude<typeof ApiRoute['getParamsFromUrl'], undefined>;
  }>;

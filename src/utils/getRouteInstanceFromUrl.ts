import {E2edError} from './error';

import type {ApiRoute} from '../ApiRoute';
import type {
  ApiRouteClassTypeWithGetParamsFromUrl,
  Url,
  WebSocketRouteClassTypeWithGetParamsFromUrl,
} from '../types/internal';
import type {WebSocketRoute} from '../WebSocketRoute';

type Return<RouteParams> =
  | Readonly<{route: ApiRoute<RouteParams> | WebSocketRoute<RouteParams>; routeParams: RouteParams}>
  | undefined;

/**
 * Get route instance and route params from url and method by route class.
 * @throws {Error} If `url` accepted without errors by `getParamsFromUrlOrThrow`,
 * but not match by `isMatchUrl` method.
 * If `url` not accepted by `getParamsFromUrlOrThrow`, returns `undefined`.
 * @internal
 */
export const getRouteInstanceFromUrl = <RouteParams>(
  url: Url,
  Route:
    | ApiRouteClassTypeWithGetParamsFromUrl<RouteParams>
    | WebSocketRouteClassTypeWithGetParamsFromUrl<RouteParams>,
): Return<RouteParams> => {
  let route: ApiRoute<RouteParams> | WebSocketRoute<RouteParams> | undefined;
  let routeParams: RouteParams | undefined;

  try {
    routeParams = Route.getParamsFromUrlOrThrow(url) as RouteParams;
    route = new Route(routeParams);
  } catch {
    return undefined;
  }

  if (route.isMatchUrl(url) !== true) {
    throw new E2edError(
      `Inconsistency in "${Route.name}" route: isMatchUrl does not accept url accepted without errors by getParamsFromUrlOrThrow`,
      {route, url},
    );
  }

  return {route, routeParams};
};

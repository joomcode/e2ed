import {E2edError} from './error';

import type {ApiRoute} from '../ApiRoute';
import type {ApiRouteClassTypeWithGetParamsFromUrl, Method, Url} from '../types/internal';

type Return<RouteParams> =
  | Readonly<{route: ApiRoute<RouteParams>; routeParams: RouteParams}>
  | undefined;

/**
 * Get route instance and route params from url and method by route class.
 * @throws {Error} If `url` accepted without errors by `getParamsFromUrl`,
 * but not match by `isMatchUrl` method.
 * If `url` not accepted by `getParamsFromUrl`, returns `undefined`.
 * @internal
 */
export const getRouteInstanceFromUrl = <RouteParams>(
  url: Url,
  method: string,
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams>,
): Return<RouteParams> => {
  let route: ApiRoute<RouteParams> | undefined;
  let routeParams: RouteParams | undefined;

  const upperCaseMethod = method.toUpperCase();

  try {
    routeParams = Route.getParamsFromUrl(url, upperCaseMethod as Method) as RouteParams;
    route = new Route(routeParams);
  } catch {
    return undefined;
  }

  if (route.isMatchUrl(url) !== true) {
    throw new E2edError(
      `Inconsistency in "${Route.name}" route: isMatchUrl does not accept url accepted without errors by getParamsFromUrl`,
      {method, route, url},
    );
  }

  const routeMethod = route.getMethod();

  if (routeMethod.toUpperCase() !== upperCaseMethod) {
    return undefined;
  }

  return {route, routeParams};
};

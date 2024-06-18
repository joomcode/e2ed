import {LogEventType} from '../../constants/internal';
import {assertValueIsDefined, assertValueIsUndefined} from '../../utils/asserts';
import {getFullPackConfig} from '../../utils/config';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {getRouteInstanceFromUrl} from '../../utils/getRouteInstanceFromUrl';
import {log} from '../../utils/log';

import {waitForRequest} from './waitForRequest';

import type {
  ApiRouteClassTypeWithGetParamsFromUrl,
  MaybePromise,
  Request,
  RequestPredicate,
  RequestWithUtcTimeInMs,
  Response,
  UtcTimeInMs,
} from '../../types/internal';

type Return<RouteParams, SomeRequest extends Request> = Readonly<{
  request: RequestWithUtcTimeInMs<SomeRequest>;
  routeParams: RouteParams;
}>;

/**
 * Waits for some request (from browser) to the route filtered by route parameters predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForRequestToRoute = async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  predicate: (
    routeParams: RouteParams,
    request: RequestWithUtcTimeInMs<SomeRequest>,
  ) => MaybePromise<boolean> = () => true,
  options: {timeout?: number} = {},
): Promise<Return<RouteParams, SomeRequest>> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;
  const {waitForRequestTimeout} = getFullPackConfig();
  const {timeout = waitForRequestTimeout} = options;

  setCustomInspectOnFunction(predicate);

  const timeoutWithUnits = getDurationWithUnits(timeout);

  log(
    `Set wait for request to route "${Route.name}" with timeout ${timeoutWithUnits}`,
    {predicate},
    LogEventType.InternalAction,
  );

  let routeParams: RouteParams | undefined;

  const predicateForRequest: RequestPredicate<SomeRequest> = async (request) => {
    const maypeRouteWithRouteParams = getRouteInstanceFromUrl(request.url, Route);

    if (maypeRouteWithRouteParams === undefined) {
      return false;
    }

    const {routeParams: currentRouteParams} = maypeRouteWithRouteParams;

    const isRequestMatched = await predicate(currentRouteParams, request);

    if (isRequestMatched !== true) {
      return false;
    }

    assertValueIsUndefined(routeParams, 'routeParams is not defined');

    routeParams = currentRouteParams;

    return true;
  };

  const request = await waitForRequest(predicateForRequest, {skipLogs: true, timeout});

  assertValueIsDefined(routeParams, 'routeParams is defined', {predicate, request});

  const waitWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  log(
    `Have waited for request to route "${Route.name}" for ${waitWithUnits}`,
    {predicate, request, routeParams, timeoutWithUnits},
    LogEventType.InternalCore,
  );

  return {request, routeParams};
};

import {LogEventType} from '../../constants/internal';
import {assertValueIsDefined, assertValueIsUndefined} from '../../utils/asserts';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {getFullPackConfig} from '../../utils/getFullPackConfig';
import {getRouteInstanceFromUrl} from '../../utils/getRouteInstanceFromUrl';
import {log} from '../../utils/log';

import {waitForResponse} from './waitForResponse';

import type {
  ApiRouteClassTypeWithGetParamsFromUrl,
  MaybePromise,
  Request,
  Response,
  ResponsePredicate,
  ResponseWithRequest,
  UtcTimeInMs,
} from '../../types/internal';

type Return<RouteParams, SomeRequest extends Request, SomeResponse extends Response> = Readonly<{
  response: ResponseWithRequest<SomeResponse, SomeRequest>;
  routeParams: RouteParams;
}>;

/**
 * Waits for some response (from browser) to the route filtered by route parameters predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForResponseToRoute = async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  predicate: (
    routeParams: RouteParams,
    response: ResponseWithRequest<SomeResponse, SomeRequest>,
  ) => MaybePromise<boolean> = () => true,
  options: {timeout?: number} = {},
): Promise<Return<RouteParams, SomeRequest, SomeResponse>> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;
  const {waitForResponseTimeout} = getFullPackConfig();
  const {timeout = waitForResponseTimeout} = options;

  setCustomInspectOnFunction(predicate);

  const timeoutWithUnits = getDurationWithUnits(timeout);

  log(
    `Set wait for response to route "${Route.name}" with timeout ${timeoutWithUnits}`,
    {predicate},
    LogEventType.InternalAction,
  );

  let routeParams: RouteParams | undefined;

  const predicateForResponse: ResponsePredicate<SomeRequest, SomeResponse> = async (response) => {
    const {request} = response;
    const maypeRouteWithRouteParams = getRouteInstanceFromUrl(request.url, request.method, Route);

    if (maypeRouteWithRouteParams === undefined) {
      return false;
    }

    const {routeParams: currentRouteParams} = maypeRouteWithRouteParams;

    const isRequestMatched = await predicate(currentRouteParams, response);

    if (isRequestMatched !== true) {
      return false;
    }

    assertValueIsUndefined(routeParams, 'routeParams is not defined');

    routeParams = currentRouteParams;

    return true;
  };

  const response = await waitForResponse(predicateForResponse, {skipLogs: true, timeout});

  assertValueIsDefined(routeParams, 'routeParams is defined', {predicate, response});

  const waitWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  log(
    `Have waited for response to route "${Route.name}" for ${waitWithUnits}`,
    {predicate, response, routeParams, timeoutWithUnits},
    LogEventType.InternalCore,
  );

  return {response, routeParams};
};

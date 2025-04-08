import {LogEventType} from '../../constants/internal';
import {assertValueIsTrue} from '../../utils/asserts';
import {getFullPackConfig} from '../../utils/config';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
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
  Trigger,
  UtcTimeInMs,
} from '../../types/internal';

type Action = (<RouteParams, SomeRequest extends Request, SomeResponse extends Response>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  trigger: Trigger | undefined,
  options?: Options<RouteParams, SomeRequest, SomeResponse>,
) => Return<RouteParams, SomeRequest, SomeResponse>) &
  (<RouteParams, SomeRequest extends Request, SomeResponse extends Response>(
    Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
    options?: Options<RouteParams, SomeRequest, SomeResponse>,
  ) => Return<RouteParams, SomeRequest, SomeResponse>);

type Options<RouteParams, SomeRequest extends Request, SomeResponse extends Response> = Readonly<{
  predicate?: (
    routeParams: RouteParams,
    response: ResponseWithRequest<SomeRequest, SomeResponse>,
  ) => MaybePromise<boolean>;
  skipLogs?: boolean;
  timeout?: number;
}>;

type Return<RouteParams, SomeRequest extends Request, SomeResponse extends Response> = Promise<
  Readonly<{response: ResponseWithRequest<SomeRequest, SomeResponse>; routeParams: RouteParams}>
>;

/**
 * Waits for some response (from browser) to the route filtered by route parameters predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForResponseToRoute = (async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  triggerOrOptions?: Options<RouteParams, SomeRequest, SomeResponse> | Trigger | undefined,
  options?: Options<RouteParams, SomeRequest, SomeResponse>,
): Return<RouteParams, SomeRequest, SomeResponse> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const trigger = typeof triggerOrOptions === 'function' ? triggerOrOptions : undefined;
  const finalOptions =
    typeof triggerOrOptions === 'function' ? options : (triggerOrOptions ?? options);

  const {predicate = () => true} = finalOptions ?? {};
  const timeout = finalOptions?.timeout ?? getFullPackConfig().waitForResponseTimeout;

  const timeoutWithUnits = getDurationWithUnits(timeout);

  setCustomInspectOnFunction(predicate);

  if (trigger !== undefined) {
    setCustomInspectOnFunction(trigger);
  }

  if (finalOptions?.skipLogs !== true) {
    log(
      `Set wait for response to route "${Route.name}" with timeout ${timeoutWithUnits}`,
      {predicate, trigger},
      LogEventType.InternalAction,
    );
  }

  const sentinelValue: unique symbol = Symbol('sentinel value');

  let routeParams: RouteParams | typeof sentinelValue = sentinelValue;

  const predicateForResponse: ResponsePredicate<SomeRequest, SomeResponse> = async (response) => {
    const {request} = response;
    const maypeRouteWithRouteParams = getRouteInstanceFromUrl(request.url, Route);

    if (maypeRouteWithRouteParams === undefined) {
      return false;
    }

    const {routeParams: currentRouteParams} = maypeRouteWithRouteParams;

    const isRequestMatched = await predicate(currentRouteParams, response);

    if (isRequestMatched !== true) {
      return false;
    }

    assertValueIsTrue(routeParams === sentinelValue, 'routeParams was not setted');

    routeParams = currentRouteParams;

    return true;
  };

  const response = await waitForResponse(predicateForResponse, trigger, {skipLogs: true, timeout});

  if (routeParams === sentinelValue) {
    throw new E2edError('routeParams is not setted', {predicate, response});
  }

  const waitWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  if (finalOptions?.skipLogs !== true) {
    log(
      `Have waited for response to route "${Route.name}" for ${waitWithUnits}`,
      {predicate, response, routeParams, timeoutWithUnits, trigger},
      LogEventType.InternalCore,
    );
  }

  return {response, routeParams};
}) as Action;

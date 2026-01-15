import {ADDITIONAL_STEP_TIMEOUT, LogEventType} from '../../constants/internal';
import {step} from '../../step';
import {assertValueIsDefined, assertValueIsTrue} from '../../utils/asserts';
import {getFullPackConfig} from '../../utils/config';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {getRouteInstanceFromUrl} from '../../utils/getRouteInstanceFromUrl';

import {waitForRequest} from './waitForRequest';

import type {
  ApiRouteClassTypeWithGetParamsFromUrl,
  MaybePromise,
  Request,
  RequestPredicate,
  RequestWithUtcTimeInMs,
  Response,
  Trigger,
} from '../../types/internal';

type Action = (<RouteParams, SomeRequest extends Request, SomeResponse extends Response>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  trigger: Trigger | undefined,
  options?: Options<RouteParams, SomeRequest>,
) => Return<RouteParams, SomeRequest>) &
  (<RouteParams, SomeRequest extends Request, SomeResponse extends Response>(
    Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
    options?: Options<RouteParams, SomeRequest>,
  ) => Return<RouteParams, SomeRequest>);

type Options<RouteParams, SomeRequest extends Request> = Readonly<{
  predicate?: (
    routeParams: RouteParams,
    request: RequestWithUtcTimeInMs<SomeRequest>,
  ) => MaybePromise<boolean>;
  skipLogs?: boolean;
  timeout?: number;
}>;

type Return<RouteParams, SomeRequest extends Request> = Promise<
  Readonly<{request: RequestWithUtcTimeInMs<SomeRequest>; routeParams: RouteParams}>
>;

/**
 * Waits for some request (from browser) to the route filtered by route parameters predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForRequestToRoute = (async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteClassTypeWithGetParamsFromUrl<RouteParams, SomeRequest, SomeResponse>,
  triggerOrOptions?: Options<RouteParams, SomeRequest> | Trigger | undefined,
  options?: Options<RouteParams, SomeRequest>,
): Return<RouteParams, SomeRequest> => {
  const trigger = typeof triggerOrOptions === 'function' ? triggerOrOptions : undefined;
  const finalOptions =
    typeof triggerOrOptions === 'function' ? options : (triggerOrOptions ?? options);

  const {predicate = () => true} = finalOptions ?? {};
  const timeout = finalOptions?.timeout ?? getFullPackConfig().waitForRequestTimeout;

  const timeoutWithUnits = getDurationWithUnits(timeout);

  setCustomInspectOnFunction(predicate);

  if (trigger !== undefined) {
    setCustomInspectOnFunction(trigger);
  }

  const sentinelValue: unique symbol = Symbol('sentinel value');

  let request: RequestWithUtcTimeInMs<SomeRequest> | undefined;
  let routeParams: RouteParams | typeof sentinelValue = sentinelValue;

  await step(
    `Wait for request to route "${Route.name}" with timeout ${timeoutWithUnits}`,
    async () => {
      const predicateForRequest: RequestPredicate<SomeRequest> = async (requestObject) => {
        const maypeRouteWithRouteParams = getRouteInstanceFromUrl(requestObject.url, Route);

        if (maypeRouteWithRouteParams === undefined) {
          return false;
        }

        const {routeParams: currentRouteParams} = maypeRouteWithRouteParams;

        const isRequestMatched = await predicate(currentRouteParams, requestObject);

        if (isRequestMatched !== true) {
          return false;
        }

        assertValueIsTrue(routeParams === sentinelValue, 'routeParams was not setted');

        routeParams = currentRouteParams;

        return true;
      };

      request = await waitForRequest(predicateForRequest, trigger, {skipLogs: true, timeout});

      if (routeParams === sentinelValue) {
        throw new E2edError('routeParams is not setted', {predicate, request});
      }

      return {request, routeParams: routeParams satisfies RouteParams};
    },
    {
      payload: {predicate, timeoutWithUnits, trigger},
      skipLogs: finalOptions?.skipLogs ?? false,
      timeout: timeout + ADDITIONAL_STEP_TIMEOUT,
      type: LogEventType.InternalAction,
    },
  );

  assertValueIsDefined(request, 'request is defined', {predicate, trigger});

  return {request, routeParams: routeParams as RouteParams};
}) as Action;

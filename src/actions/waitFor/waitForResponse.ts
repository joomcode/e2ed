import {AsyncLocalStorage} from 'node:async_hooks';

import {LogEventType} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {getPlaywrightPage} from '../../useContext';
import {getFullPackConfig} from '../../utils/config';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';
import {getResponseFromPlaywrightResponse} from '../../utils/requestHooks';
import {getWaitForResponsePredicate} from '../../utils/waitForEvents';

import type {
  Request,
  Response,
  ResponsePredicate,
  ResponseWithRequest,
  Trigger,
  UtcTimeInMs,
} from '../../types/internal';

type Action = (<SomeRequest extends Request = Request, SomeResponse extends Response = Response>(
  predicate: ResponsePredicate<SomeRequest, SomeResponse>,
  trigger: Trigger | undefined,
  options?: Options,
) => Promise<ResponseWithRequest<SomeRequest, SomeResponse>>) &
  (<SomeRequest extends Request = Request, SomeResponse extends Response = Response>(
    predicate: ResponsePredicate<SomeRequest, SomeResponse>,
    options?: Options,
  ) => Promise<ResponseWithRequest<SomeRequest, SomeResponse>>);

type Options = Readonly<{includeNavigationRequest?: boolean; skipLogs?: boolean; timeout?: number}>;

/**
 * Waits for some response (from browser) filtered by the response predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForResponse = (async <
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
>(
  predicate: ResponsePredicate<SomeRequest, SomeResponse>,
  triggerOrOptions?: Options | Trigger | undefined,
  options?: Options,
): Promise<ResponseWithRequest<SomeRequest, SomeResponse>> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  setCustomInspectOnFunction(predicate);

  const trigger = typeof triggerOrOptions === 'function' ? triggerOrOptions : undefined;
  const finalOptions =
    typeof triggerOrOptions === 'function' ? options : (triggerOrOptions ?? options);

  const timeout = finalOptions?.timeout ?? getFullPackConfig().waitForResponseTimeout;

  if (trigger !== undefined) {
    setCustomInspectOnFunction(trigger);
  }

  const page = getPlaywrightPage();
  const testRunPromise = getTestRunPromise();

  let isTestRunCompleted = false;

  void testRunPromise.then(() => {
    isTestRunCompleted = true;
  });

  const promise = page
    .waitForResponse(
      AsyncLocalStorage.bind(
        getWaitForResponsePredicate(
          predicate as ResponsePredicate,
          finalOptions?.includeNavigationRequest ?? false,
          timeout,
        ),
      ),
      {timeout},
    )
    .then(
      (playwrightResponse) =>
        getResponseFromPlaywrightResponse(playwrightResponse) as Promise<
          ResponseWithRequest<SomeRequest, SomeResponse>
        >,
    )
    .catch((error: unknown) => {
      if (isTestRunCompleted) {
        return new Promise<ResponseWithRequest<SomeRequest, SomeResponse>>(() => {});
      }

      throw error;
    });

  const timeoutWithUnits = getDurationWithUnits(timeout);

  if (finalOptions?.skipLogs !== true) {
    log(
      `Set wait for response with timeout ${timeoutWithUnits}`,
      {predicate, trigger},
      LogEventType.InternalCore,
    );
  }

  await trigger?.();

  const response = await promise;

  if (finalOptions?.skipLogs !== true) {
    const waitWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

    log(
      `Have waited for response for ${waitWithUnits}`,
      {predicate, response, timeoutWithUnits, trigger},
      LogEventType.InternalCore,
    );
  }

  return response;
}) as Action;

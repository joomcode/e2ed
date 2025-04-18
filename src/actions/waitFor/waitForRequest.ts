import {AsyncLocalStorage} from 'node:async_hooks';

import {LogEventType, MAX_TIMEOUT_IN_MS} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {getPlaywrightPage} from '../../useContext';
import {getFullPackConfig} from '../../utils/config';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';
import {addTimeoutToPromise} from '../../utils/promise';
import {getRequestFromPlaywrightRequest} from '../../utils/requestHooks';

import type {Request as PlaywrightRequest} from '@playwright/test';

import type {
  Request,
  RequestPredicate,
  RequestWithUtcTimeInMs,
  Trigger,
  UtcTimeInMs,
} from '../../types/internal';

type Action = (<SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
  trigger: Trigger | undefined,
  options?: Options,
) => Promise<RequestWithUtcTimeInMs<SomeRequest>>) &
  (<SomeRequest extends Request>(
    predicate: RequestPredicate<SomeRequest>,
    options?: Options,
  ) => Promise<RequestWithUtcTimeInMs<SomeRequest>>);

type Options = Readonly<{skipLogs?: boolean; timeout?: number}>;

/**
 * Waits for some request (from browser) filtered by the request predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForRequest = (async <SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
  triggerOrOptions?: Options | Trigger | undefined,
  options?: Options,
): Promise<RequestWithUtcTimeInMs<SomeRequest>> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  setCustomInspectOnFunction(predicate);

  const trigger = typeof triggerOrOptions === 'function' ? triggerOrOptions : undefined;
  const finalOptions =
    typeof triggerOrOptions === 'function' ? options : (triggerOrOptions ?? options);

  const timeout = finalOptions?.timeout ?? getFullPackConfig().waitForRequestTimeout;

  if (trigger !== undefined) {
    setCustomInspectOnFunction(trigger);
  }

  const page = getPlaywrightPage();
  const testRunPromise = getTestRunPromise();

  let isTestRunCompleted = false;

  void testRunPromise.then(() => {
    isTestRunCompleted = true;
  });

  const timeoutWithUnits = getDurationWithUnits(timeout);

  const promise = addTimeoutToPromise(
    page.waitForRequest(
      AsyncLocalStorage.bind(async (playwrightRequest: PlaywrightRequest) => {
        try {
          const request = getRequestFromPlaywrightRequest(playwrightRequest);

          const result = await predicate(request as RequestWithUtcTimeInMs<SomeRequest>);

          return result;
        } catch (cause) {
          throw new E2edError('waitForRequest predicate threw an exception', {
            cause,
            timeout,
            trigger,
          });
        }
      }),
      {timeout: MAX_TIMEOUT_IN_MS},
    ),
    timeout,
    new E2edError(`waitForRequest promise rejected after ${timeoutWithUnits} timeout`),
  )
    .then(
      AsyncLocalStorage.bind(
        (playwrightRequest: PlaywrightRequest) =>
          getRequestFromPlaywrightRequest(playwrightRequest) as RequestWithUtcTimeInMs<SomeRequest>,
      ),
    )
    .catch((error: unknown) => {
      if (isTestRunCompleted) {
        return new Promise<RequestWithUtcTimeInMs<SomeRequest>>(() => {});
      }

      throw error;
    });

  if (finalOptions?.skipLogs !== true) {
    log(
      `Set wait for request with timeout ${timeoutWithUnits}`,
      {predicate, trigger},
      LogEventType.InternalCore,
    );
  }

  await trigger?.();

  const request = await promise;

  if (finalOptions?.skipLogs !== true) {
    const waitWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

    log(
      `Have waited for request for ${waitWithUnits}`,
      {predicate, request, timeoutWithUnits, trigger},
      LogEventType.InternalCore,
    );
  }

  return request;
}) as Action;

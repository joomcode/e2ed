import {AsyncLocalStorage} from 'node:async_hooks';

import {ADDITIONAL_STEP_TIMEOUT, LogEventType, MAX_TIMEOUT_IN_MS} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {step} from '../../step';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {getFullPackConfig} from '../../utils/config';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {pageWaitForRequest} from '../../utils/playwrightPage';
import {addTimeoutToPromise} from '../../utils/promise';
import {getRequestFromPlaywrightRequest} from '../../utils/requestHooks';

import type {Request as PlaywrightRequest} from '@playwright/test';

import type {
  Request,
  RequestPredicate,
  RequestWithUtcTimeInMs,
  Trigger,
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

type Options = Readonly<{
  skipLogs?: boolean;
  timeout?: number;
}>;

/**
 * Waits for some request (from browser) filtered by the request predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForRequest = (async <SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
  triggerOrOptions?: Options | Trigger | undefined,
  options?: Options,
): Promise<RequestWithUtcTimeInMs<SomeRequest>> => {
  setCustomInspectOnFunction(predicate);

  const trigger = typeof triggerOrOptions === 'function' ? triggerOrOptions : undefined;
  const finalOptions =
    typeof triggerOrOptions === 'function' ? options : (triggerOrOptions ?? options);

  const timeout = finalOptions?.timeout ?? getFullPackConfig().waitForRequestTimeout;
  const timeoutWithUnits = getDurationWithUnits(timeout);

  if (trigger !== undefined) {
    setCustomInspectOnFunction(trigger);
  }

  let request: RequestWithUtcTimeInMs<SomeRequest> | undefined;

  await step(
    `Wait for request with timeout ${timeoutWithUnits}`,
    async () => {
      const page = getPlaywrightPage();
      const testRunPromise = getTestRunPromise();

      let isTestRunCompleted = false;

      void testRunPromise.then(() => {
        isTestRunCompleted = true;
      });

      let finalError: unknown;
      let hasError = false;

      const promise = addTimeoutToPromise(
        pageWaitForRequest(
          page,
          AsyncLocalStorage.bind(async (playwrightRequest: PlaywrightRequest) => {
            try {
              const requestObject = getRequestFromPlaywrightRequest(playwrightRequest);

              const result = await predicate(requestObject as RequestWithUtcTimeInMs<SomeRequest>);

              return result;
            } catch (cause) {
              if (!isTestRunCompleted) {
                finalError = new E2edError('waitForRequest predicate threw an exception', {
                  cause,
                  timeout,
                  trigger,
                });
                hasError = true;
              }

              return true;
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
              getRequestFromPlaywrightRequest(
                playwrightRequest,
              ) as RequestWithUtcTimeInMs<SomeRequest>,
          ),
        )
        .catch((error: unknown) => {
          if (isTestRunCompleted) {
            return new Promise<RequestWithUtcTimeInMs<SomeRequest>>(() => {});
          }

          throw error;
        });

      await trigger?.();

      request = await promise;

      if (hasError) {
        throw finalError;
      }

      return {request};
    },
    {
      payload: {predicate, timeoutWithUnits, trigger},
      skipLogs: finalOptions?.skipLogs ?? false,
      timeout: timeout + ADDITIONAL_STEP_TIMEOUT,
      type: LogEventType.InternalCore,
    },
  );

  assertValueIsDefined(request, 'request is defined', {predicate, trigger});

  return request;
}) as Action;

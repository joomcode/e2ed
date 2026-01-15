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
import {pageWaitForResponse} from '../../utils/playwrightPage';
import {addTimeoutToPromise} from '../../utils/promise';
import {getResponseFromPlaywrightResponse} from '../../utils/requestHooks';
import {getWaitForResponsePredicate} from '../../utils/waitForEvents';

import type {Response as PlaywrightResponse} from '@playwright/test';

import type {
  Request,
  Response,
  ResponsePredicate,
  ResponseWithRequest,
  Trigger,
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
  setCustomInspectOnFunction(predicate);

  const trigger = typeof triggerOrOptions === 'function' ? triggerOrOptions : undefined;
  const finalOptions =
    typeof triggerOrOptions === 'function' ? options : (triggerOrOptions ?? options);

  const timeout = finalOptions?.timeout ?? getFullPackConfig().waitForResponseTimeout;
  const timeoutWithUnits = getDurationWithUnits(timeout);

  if (trigger !== undefined) {
    setCustomInspectOnFunction(trigger);
  }

  let response: ResponseWithRequest<SomeRequest, SomeResponse> | undefined;

  await step(
    `Wait for response with timeout ${timeoutWithUnits}`,
    async () => {
      const page = getPlaywrightPage();
      const testRunPromise = getTestRunPromise();

      let isTestRunCompleted = false;

      void testRunPromise.then(() => {
        isTestRunCompleted = true;
      });

      const finalPredicate = getWaitForResponsePredicate(
        predicate as ResponsePredicate,
        finalOptions?.includeNavigationRequest ?? false,
      );

      let finalError: unknown;
      let hasError = false;

      const promise = addTimeoutToPromise(
        pageWaitForResponse(
          page,
          AsyncLocalStorage.bind(async (playwrightResponse: PlaywrightResponse) => {
            try {
              const result = await finalPredicate(playwrightResponse);

              return result;
            } catch (cause) {
              if (!isTestRunCompleted) {
                finalError = new E2edError('waitForResponse predicate threw an exception', {
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
        new E2edError(`waitForResponse promise rejected after ${timeoutWithUnits} timeout`),
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

      await trigger?.();

      response = await promise;

      if (hasError) {
        throw finalError;
      }

      return {response};
    },
    {
      payload: {predicate, timeoutWithUnits, trigger},
      skipLogs: finalOptions?.skipLogs ?? false,
      timeout: timeout + ADDITIONAL_STEP_TIMEOUT,
      type: LogEventType.InternalCore,
    },
  );

  assertValueIsDefined(response, 'response is defined', {predicate, trigger});

  return response;
}) as Action;

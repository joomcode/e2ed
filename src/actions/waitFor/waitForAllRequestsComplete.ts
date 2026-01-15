import {ADDITIONAL_STEP_TIMEOUT, LogEventType} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {step} from '../../step';
import {getFullPackConfig} from '../../utils/config';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {setReadonlyProperty} from '../../utils/object';
import {getPromiseWithResolveAndReject} from '../../utils/promise';
import {
  getInitialIdsForAllRequestsCompletePredicate,
  getUrlsByRequestHookContextIds,
} from '../../utils/waitForEvents';

import type {
  AllRequestsCompletePredicateWithPromise,
  RequestPredicate,
  UtcTimeInMs,
  Void,
} from '../../types/internal';

type Options = Readonly<{
  maxIntervalBetweenRequestsInMs?: number;
  skipLogs?: boolean;
  timeout?: number;
}>;

/**
 * Waits for the complete of all requests that satisfy the request predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 * If there are no new requests for more than `maxIntervalBetweenRequestsInMs` milliseconds,
 * the function resolves successfully.
 */
export const waitForAllRequestsComplete = async (
  predicate: RequestPredicate,
  {maxIntervalBetweenRequestsInMs, skipLogs = false, timeout}: Options = {},
): Promise<void> => {
  setCustomInspectOnFunction(predicate);

  const {allRequestsCompletePredicates, hashOfNotCompleteRequests} = getWaitForEventsState();
  const {waitForAllRequestsComplete: defaultTimeouts} = getFullPackConfig();
  const resolveTimeout =
    maxIntervalBetweenRequestsInMs ?? defaultTimeouts.maxIntervalBetweenRequestsInMs;
  const maxIntervalBetweenRequests = getDurationWithUnits(resolveTimeout);
  const rejectTimeout = timeout ?? defaultTimeouts.timeout;
  const rejectTimeoutWithUnits = getDurationWithUnits(rejectTimeout);

  await step(
    `Wait for all requests complete with timeout ${rejectTimeoutWithUnits}`,
    async () => {
      const requestHookContextIds = await getInitialIdsForAllRequestsCompletePredicate(
        hashOfNotCompleteRequests,
        predicate,
      );

      const {clearRejectTimeout, promiseWithTimeout, reject, resolve, setRejectTimeoutFunction} =
        getPromiseWithResolveAndReject<Void>(rejectTimeout);

      const allRequestsCompletePredicateWithPromise: AllRequestsCompletePredicateWithPromise = {
        allRequestsCompleteTimeInMs: 0 as UtcTimeInMs,
        clearResolveTimeout: () => {},
        predicate,
        reject,
        requestHookContextIds,
        setResolveTimeout: () => {},
      };
      const testRunPromise = getTestRunPromise();

      void testRunPromise.then(clearRejectTimeout);

      setRejectTimeoutFunction(() => {
        const {allRequestsCompleteTimeInMs} = allRequestsCompletePredicateWithPromise;
        const logParamsAboutTime =
          allRequestsCompleteTimeInMs === 0
            ? {allRequestsHaveNeverBeenCompletedYet: true}
            : {
                timeSinceAllRequestsComplete: getDurationWithUnits(
                  Date.now() - allRequestsCompleteTimeInMs,
                ),
              };
        const urlsOfNotCompleteRequests = getUrlsByRequestHookContextIds(
          requestHookContextIds,
          hashOfNotCompleteRequests,
        );
        const error = new E2edError(
          `waitForAllRequestsComplete promise rejected after ${rejectTimeoutWithUnits} timeout`,
          {...logParamsAboutTime, predicate, urlsOfNotCompleteRequests},
        );

        allRequestsCompletePredicates.delete(allRequestsCompletePredicateWithPromise);

        allRequestsCompletePredicateWithPromise.clearResolveTimeout();

        reject(error);
      });

      const setResolveTimeout = (): void => {
        setReadonlyProperty(
          allRequestsCompletePredicateWithPromise,
          'allRequestsCompleteTimeInMs',
          Date.now() as UtcTimeInMs,
        );

        allRequestsCompletePredicateWithPromise.clearResolveTimeout();

        const {clearRejectTimeout: clearResolveTimeout, promiseWithTimeout: resolvePromise} =
          getPromiseWithResolveAndReject<Void>(resolveTimeout);

        setReadonlyProperty(
          allRequestsCompletePredicateWithPromise,
          'clearResolveTimeout',
          clearResolveTimeout,
        );

        void testRunPromise.then(clearResolveTimeout);

        resolvePromise.catch(() => {
          allRequestsCompletePredicates.delete(allRequestsCompletePredicateWithPromise);

          resolve();
        });
      };

      setReadonlyProperty(
        allRequestsCompletePredicateWithPromise,
        'setResolveTimeout',
        setResolveTimeout,
      );

      allRequestsCompletePredicates.add(allRequestsCompletePredicateWithPromise);

      if (requestHookContextIds.size === 0) {
        allRequestsCompletePredicateWithPromise.setResolveTimeout();
      }

      await promiseWithTimeout;
    },
    {
      payload: {maxIntervalBetweenRequests, predicate},
      skipLogs,
      timeout: rejectTimeout + ADDITIONAL_STEP_TIMEOUT,
      type: LogEventType.InternalCore,
    },
  );
};

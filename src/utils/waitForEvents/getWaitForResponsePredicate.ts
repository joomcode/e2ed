import {getIsPageNavigatingNow} from '../../context/isPageNavigatingNow';
import {getNavigationDelay} from '../../context/navigationDelay';
import {getTestIdleTimeout} from '../../context/testIdleTimeout';

import {setReadonlyProperty} from '../object';
import {getPromiseWithResolveAndReject, getTimeoutPromise} from '../promise';
import {getResponseFromPlaywrightResponse} from '../requestHooks';

import type {Response as PlaywrightResponse} from '@playwright/test';

import type {NavigationDelay, ResponsePredicate, Void} from '../../types/internal';

const maxNavigationDelay = 3_000;
const navigationDelayAfterLastEventInMs = 300;

/**
 * Get internal predicate for `waitForResponse` function.
 * @internal
 */
export const getWaitForResponsePredicate = (
  predicate: ResponsePredicate,
  includeNavigationRequest: boolean,
): ((playwrightResponse: PlaywrightResponse) => Promise<boolean>) => {
  const testIdleTimeout = getTestIdleTimeout();
  const navigationDelay = getNavigationDelay();

  return async (playwrightResponse: PlaywrightResponse) => {
    const isPageNavigatingNow = getIsPageNavigatingNow();

    if (!includeNavigationRequest && isPageNavigatingNow) {
      return false;
    }

    if (navigationDelay.promise === undefined) {
      const {promiseWithTimeout, resolve} = getPromiseWithResolveAndReject<Void>(testIdleTimeout);

      void setReadonlyProperty(navigationDelay as NavigationDelay, 'promise', promiseWithTimeout);
      setReadonlyProperty(navigationDelay as NavigationDelay, 'resolve', resolve);
    }

    setReadonlyProperty(navigationDelay, 'reasonsCount', navigationDelay.reasonsCount + 1);

    let isDecreased = false;

    const decreaseReasonsCount = (): void => {
      if (isDecreased) {
        return;
      }

      isDecreased = true;

      setReadonlyProperty(navigationDelay, 'reasonsCount', navigationDelay.reasonsCount - 1);

      if (navigationDelay.reasonsCount <= 0) {
        const {resolve} = navigationDelay;

        void setReadonlyProperty(navigationDelay, 'promise', undefined);
        setReadonlyProperty(navigationDelay, 'resolve', undefined);

        resolve?.();
      }
    };

    const response = await Promise.race([
      getResponseFromPlaywrightResponse(playwrightResponse),
      getTimeoutPromise(maxNavigationDelay).then(decreaseReasonsCount),
    ]);

    setTimeout(decreaseReasonsCount, navigationDelayAfterLastEventInMs);

    if (response === undefined) {
      return false;
    }

    return predicate(response);
  };
};

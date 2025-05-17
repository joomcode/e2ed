import {pageWaitForRequest, waitForRequestCalls} from './waitForRequest';
import {pageWaitForResponse, waitForResponseCalls} from './waitForResponse';

import type {Page} from '@playwright/test';

/**
 * Switches internal Playwright page from old to new.
 * Removes all event handlers from the old page and moves them to the new one.
 * @internal
 */
export const switchPlaywrightPage = (newPage: Page): void => {
  const oldRequestCalls = [...waitForRequestCalls];

  waitForRequestCalls.length = 0;

  for (const {disablePredicate, options, predicate, reject, resolve} of oldRequestCalls) {
    disablePredicate();

    pageWaitForRequest(newPage, predicate, options).then(resolve, reject);
  }

  const oldResponseCalls = [...waitForResponseCalls];

  waitForResponseCalls.length = 0;

  for (const {disablePredicate, options, predicate, reject, resolve} of oldResponseCalls) {
    disablePredicate();

    pageWaitForResponse(newPage, predicate, options).then(resolve, reject);
  }
};

import {AsyncLocalStorage} from 'node:async_hooks';

import {assertValueIsDefined} from '../utils/asserts';

import type {Page} from '@playwright/test';

/**
 * Async local storage for `page` of current test.
 * @internal
 */
export const pageStorage = new AsyncLocalStorage<Page>();

/**
 * Get `page` object from context of current test.
 */
export const getPlaywrightPage = (): Page => {
  const maybePage = pageStorage.getStore();

  assertValueIsDefined(maybePage, 'maybePage is defined');

  return maybePage;
};

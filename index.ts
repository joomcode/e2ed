/**
 * @file This file contains the highest-level e2ed API, which depends on all other e2ed-utilities.
 * Do not import functions from here into other e2ed-utilities to avoid circular dependencies.
 */
import {t} from 'testcafe';

import {waitForInterfaceStabilization} from './actions';
import {pages} from './pageObjects';
import type {Page} from './Page';
import type {NavigateToPage} from './types';
import {log} from './utils';

type Pages = typeof pages;

/**
 * Navigate to the page by page name and page params.
 */
export const navigateToPage: NavigateToPage<Pages> = async (
  pageName: keyof Pages,
  params?: unknown,
): Promise<never> => {
  const startTime = Date.now();
  const page: Page = pages[pageName];
  const fullParams = await page.willNavigateTo(params as never);
  const url = page.route.getUrl(fullParams as never);
  const startNavigateTime = Date.now();
  log(`Will navigate to the page "${String(pageName)}"`, {
    originParams: params,
    fullParams,
    url,
    willNavigateToExecutedInMs: startNavigateTime - startTime,
  });
  await t.navigateTo(url);
  await waitForInterfaceStabilization(2000);
  log(`Page "${String(pageName)}" loaded in ${Date.now() - startNavigateTime} ms`, {url});
  return page as never;
};

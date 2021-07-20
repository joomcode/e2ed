import {t} from 'testcafe';

import {waitForInterfaceStabilization} from './actions';
import {pages} from './pageObjects';
import {log} from './utils';

import type {Page} from './Page';
import type {NavigateToPage} from './types';

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

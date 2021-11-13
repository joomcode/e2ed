import {waitForNavigateInterfaceStabilization} from './actions/waitForNavigateInterfaceStabilization';
import {navigateTo} from './hooks';
import {pages} from './pageObjects';
import {log} from './utils/log';

import type {Page} from './Page';
import type {NavigateToPage} from './types/internal';

type Pages = typeof pages;

/**
 * Navigates to the page by page name and page params.
 */
export const navigateToPage: NavigateToPage<Pages> = async (
  pageName: keyof Pages,
  pageParams?: unknown,
): Promise<never> => {
  const startTime = Date.now();
  const page: Page<unknown, unknown> = pages[pageName];
  const routeParams = await page.willNavigateTo(pageParams as never);
  const url = page.route.getUrl(routeParams as never);
  const startNavigateTime = Date.now();

  await log(
    `Will navigate to the page "${String(pageName)}"`,
    {
      pageParams,
      routeParams,
      url,
      willNavigateToExecutedInMs: startNavigateTime - startTime,
    },
    'internalCore',
  );

  await navigateTo(url);

  await waitForNavigateInterfaceStabilization();

  await log(
    `Page "${String(pageName)}" loaded in ${Date.now() - startNavigateTime} ms`,
    {url},
    'internalCore',
  );

  return page as never;
};

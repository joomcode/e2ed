import {waitForInterfaceStabilization} from './actions/waitForInterfaceStabilization';
import {navigateTo} from './hooks';
import {pages} from './pageObjects';
import {getIntegerFromEnvVariable} from './utils/getIntegerFromEnvVariable';
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
  const page: Page = pages[pageName];
  const routeParams = await page.willNavigateTo(pageParams as never);
  const url = page.route.getUrl(routeParams as never);
  const startNavigateTime = Date.now();

  log(`Will navigate to the page "${String(pageName)}"`, {
    pageParams,
    routeParams,
    url,
    willNavigateToExecutedInMs: startNavigateTime - startTime,
  });

  await navigateTo(url);

  const stabilizationInterval = getIntegerFromEnvVariable({
    defaultValue: 2000,
    maxValue: 60_000,
    name: 'E2ED_NAVIGATE_STABILIZATION_INTERVAL',
  });

  await waitForInterfaceStabilization(stabilizationInterval);

  log(`Page "${String(pageName)}" loaded in ${Date.now() - startNavigateTime} ms`, {url});

  return page as never;
};

import {waitForNavigateInterfaceStabilization} from './actions/waitForNavigateInterfaceStabilization';
import {setPageLoaded} from './context/pageLoaded';
import {setPageParams} from './context/pageParams';
import {setRouteParams} from './context/routeParams';
import {navigateTo} from './hooks';
import {pages} from './pageObjects';
import {log} from './utils/log';

import type {Page} from './Page';
import type {NavigateToPage, UtcTimeInMs} from './types/internal';

type Pages = typeof pages;

/**
 * Navigates to the page by page name and page params.
 */
export const navigateToPage: NavigateToPage<Pages> = async (
  pageName: keyof Pages,
  pageParams?: unknown,
): Promise<never> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;
  const page: Page<unknown, unknown> = pages[pageName];
  const routeParams = await page.willNavigateTo(pageParams as never);

  setPageParams(pageParams);
  setRouteParams(routeParams);

  const url = page.route.getUrl(routeParams as never);
  const startNavigateTimeInMs = Date.now() as UtcTimeInMs;

  await log(
    `Will navigate to the page "${String(pageName)}"`,
    {
      pageParams,
      routeParams,
      url,
      willNavigateToExecutedInMs: startNavigateTimeInMs - startTimeInMs,
    },
    'internalCore',
  );

  await navigateTo(url);

  await waitForNavigateInterfaceStabilization();

  await log(
    `Page "${String(pageName)}" loaded in ${Date.now() - startNavigateTimeInMs} ms`,
    {url},
    'internalCore',
  );

  setPageLoaded(true);

  return page as never;
};

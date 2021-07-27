import {waitForInterfaceStabilization} from './actions/waitForInterfaceStabilization';
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

  const stabilizationIntervalFromEnv = Number(process.env.E2ED_NAVIGATE_STABILIZATION_INTERVAL);
  const isStabilizationIntervalFromEnvValid =
    Number.isInteger(stabilizationIntervalFromEnv) && stabilizationIntervalFromEnv > 0;
  const stabilizationInterval = isStabilizationIntervalFromEnvValid
    ? stabilizationIntervalFromEnv
    : 2000;

  if (
    process.env.E2ED_NAVIGATE_STABILIZATION_INTERVAL !== undefined &&
    isStabilizationIntervalFromEnvValid === false
  ) {
    log(
      `Invalid value for environment variable E2ED_NAVIGATE_STABILIZATION_INTERVAL: ${process.env.E2ED_NAVIGATE_STABILIZATION_INTERVAL}. Instead, use the default value ${stabilizationInterval}`,
      {url},
    );
  }

  await waitForInterfaceStabilization(stabilizationInterval);

  log(`Page "${String(pageName)}" loaded in ${Date.now() - startNavigateTime} ms`, {url});

  return page as never;
};

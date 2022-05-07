import {LogEventType} from '../../constants/internal';
import {setPageLoaded} from '../../context/pageLoaded';
import {navigateTo} from '../../hooks';
import {log} from '../../utils/log';

import {waitForNavigateInterfaceStabilization} from '../waitForNavigateInterfaceStabilization';

import {createPageInstance} from './createPageInstance';

import type {NavigateToOrAssertPage, PageClassType, UtcTimeInMs} from '../../types/internal';

/**
 * Navigates to the page by page class and page params.
 */
export const navigateToPage: NavigateToOrAssertPage = async <PageParams>(
  PageClass: PageClassType<PageParams>,
  pageParams: PageParams,
): Promise<never> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const page = await createPageInstance(PageClass, pageParams);

  const route = page.getRoute();
  const url = route.getUrl();
  const startNavigateTimeInMs = Date.now() as UtcTimeInMs;

  await log(
    `Will navigate to the page "${PageClass.name}"`,
    {
      pageParams,
      routeParams: route.params,
      url,
      willNavigateToExecutedInMs: startNavigateTimeInMs - startTimeInMs,
    },
    LogEventType.InternalCore,
  );

  if (page.beforeNavigateToPage) {
    await page.beforeNavigateToPage();
  }

  await navigateTo(url);

  await waitForNavigateInterfaceStabilization();

  if (page.afterNavigateToPage) {
    await page.afterNavigateToPage();
  }

  await log(
    `Page "${PageClass.name}" loaded in ${Date.now() - startNavigateTimeInMs} ms`,
    {url},
    LogEventType.InternalCore,
  );

  setPageLoaded(true);

  return page as never;
};

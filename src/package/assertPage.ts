import {waitForNavigateInterfaceStabilization} from './actions/waitForNavigateInterfaceStabilization';
import {LogEventType} from './constants/internal';
import {setPageLoaded} from './context/pageLoaded';
import {setPageParams} from './context/pageParams';
import {setRouteParams} from './context/routeParams';
import {assertValueIsDefined} from './utils/asserts';
import {getCurrentUrl} from './utils/getCurrentUrl';
import {log} from './utils/log';
import {expect} from './expect';
import {pages} from './pageObjects';

import type {Page} from './Page';
import type {AssertPage} from './types/internal';

type Pages = typeof pages;

/**
 * Navigates to the page by page name and page params.
 */
export const assertPage: AssertPage<Pages> = async (
  pageName: keyof Pages,
  routeParams?: unknown,
): Promise<never> => {
  await waitForNavigateInterfaceStabilization();

  const page: Page<unknown, unknown> = pages[pageName];
  const currentUrl = await getCurrentUrl();

  assertValueIsDefined(currentUrl);

  const isMatch = page.route.isMatchUrl(currentUrl, routeParams);

  const message = `Assert that the current url matches the specified page "${String(pageName)}"`;

  await log(
    message,
    {
      currentUrl,
      isMatch,
      routeParams,
    },
    LogEventType.InternalCore,
  );

  await expect(isMatch, message).ok();

  setPageLoaded(true);
  setPageParams(undefined);
  setRouteParams(routeParams);

  return page as never;
};

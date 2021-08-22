import {waitForNavigateInterfaceStabilization} from './actions/waitForNavigateInterfaceStabilization';
import {expect} from './expect';
import {pages} from './pageObjects';
import {assertValueIsDefined} from './utils/asserts';
import {getCurrentUrl} from './utils/getCurrentUrl';
import {log} from './utils/log';

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

  log(message, {
    currentUrl,
    isMatch,
    routeParams,
  });

  await expect(isMatch, message).ok();

  return page as never;
};

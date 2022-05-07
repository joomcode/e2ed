import {LogEventType} from '../../constants/internal';
import {setPageLoaded} from '../../context/pageLoaded';
import {expect} from '../../expect';
import {assertValueIsDefined} from '../../utils/asserts';
import {getCurrentUrl} from '../../utils/getCurrentUrl';
import {log} from '../../utils/log';

import {waitForNavigateInterfaceStabilization} from '../waitForNavigateInterfaceStabilization';

import {createPageInstance} from './createPageInstance';

import type {NavigateToOrAssertPage, PageClassType} from '../../types/internal';

/**
 * Asserts that we are on the expected page by page parameters.
 */
export const assertPage: NavigateToOrAssertPage = async <PageParams>(
  PageClass: PageClassType<PageParams>,
  pageParams: PageParams,
): Promise<never> => {
  await waitForNavigateInterfaceStabilization();

  const page = await createPageInstance(PageClass, pageParams);

  const route = page.getRoute();

  if (page.beforeAssertPage) {
    await page.beforeAssertPage();
  }

  const currentUrl = await getCurrentUrl();

  assertValueIsDefined(currentUrl);

  const isMatch = route.isMatchUrl(currentUrl);

  const message = `Assert that the current url matches the specified page "${PageClass.name}"`;

  await log(
    message,
    {
      currentUrl,
      isMatch,
      routeParams: route.params,
    },
    LogEventType.InternalCore,
  );

  await expect(isMatch, message).ok();

  setPageLoaded(true);

  if (page.afterAssertPage) {
    await page.afterAssertPage();
  }

  return page as never;
};

import {LogEventType} from '../../constants/internal';
import {setPageLoaded} from '../../context/pageLoaded';
import {expect} from '../../expect';
import {assertValueIsDefined} from '../../utils/asserts';
import {getCurrentUrl} from '../../utils/getCurrentUrl';
import {log} from '../../utils/log';

import {waitForInterfaceStabilization} from '../waitFor';

import {createPageInstance} from './createPageInstance';

import type {AnyPageClassType, NavigateToOrAssertPageArgs} from '../../types/internal';

/**
 * Asserts that we are on the expected page by page parameters.
 */
export const assertPage = async <SomePageClass extends AnyPageClassType>(
  ...args: NavigateToOrAssertPageArgs<SomePageClass>
): Promise<InstanceType<SomePageClass>> => {
  const [PageClass, pageParams] = args;

  const page = await createPageInstance(PageClass, pageParams);

  await waitForInterfaceStabilization(page.pageStabilizationInterval);

  const route = page.getRoute();

  if (page.beforeAssertPage) {
    await page.beforeAssertPage();
  }

  const currentUrl = await getCurrentUrl();

  assertValueIsDefined(currentUrl, 'currentUrl is defined', {
    pageName: PageClass.name,
    pageParams,
    route,
  });

  const isMatch = route.isMatchUrl(currentUrl);

  const message = `the current url matches the specified page "${PageClass.name}"`;

  await log(
    `Assert that ${message}`,
    {
      currentUrl,
      isMatch,
      pageParams,
      routeParams: route.params,
    },
    LogEventType.InternalAction,
  );

  await expect(isMatch, message).ok();

  setPageLoaded(true);

  if (page.afterAssertPage) {
    await page.afterAssertPage();
  }

  return page;
};

import {LogEventType} from '../../constants/internal';
import {expect} from '../../expect';
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
  const isMatch = route.isMatchUrl(currentUrl);

  const message = `the current url matches the specified page "${PageClass.name}"`;
  const {routeParams} = route;

  await log(
    `Assert that ${message}`,
    {currentUrl, isMatch, pageParams, routeParams},
    LogEventType.InternalAction,
  );

  await expect(isMatch, message).ok();

  if (page.afterAssertPage) {
    await page.afterAssertPage();
  }

  return page;
};

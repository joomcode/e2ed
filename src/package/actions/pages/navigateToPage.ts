import {LogEventType} from '../../constants/internal';
import {log} from '../../utils/log';

import {waitForInterfaceStabilization} from '../waitFor';

import {createPageInstance} from './createPageInstance';

import type {AnyPageClassType, NavigateToOrAssertPageArgs, UtcTimeInMs} from '../../types/internal';

/**
 * Navigates to the page by page class and page params.
 */
export const navigateToPage = async <SomePageClass extends AnyPageClassType>(
  ...args: NavigateToOrAssertPageArgs<SomePageClass>
): Promise<InstanceType<SomePageClass>> => {
  const [PageClass, pageParams] = args;

  const startTimeInMs = Date.now() as UtcTimeInMs;

  const page = await createPageInstance(PageClass, pageParams);

  const route = page.getRoute();
  const {routeParams} = route;
  const url = route.getUrl();
  const startNavigateTimeInMs = Date.now() as UtcTimeInMs;
  const pageInstanceCreatedInMs = startNavigateTimeInMs - startTimeInMs;

  await log(
    `Will navigate to the page "${PageClass.name}"`,
    {pageInstanceCreatedInMs, pageParams, routeParams, url},
    LogEventType.InternalAction,
  );

  if (page.beforeNavigateToPage) {
    await page.beforeNavigateToPage();
  }

  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const hooks = require<typeof import('../../hooks')>('../../hooks');

  await hooks.navigateTo(url);

  await waitForInterfaceStabilization(page.pageStabilizationInterval);

  if (page.afterNavigateToPage) {
    await page.afterNavigateToPage();
  }

  await log(
    `Page "${PageClass.name}" loaded in ${Date.now() - startNavigateTimeInMs}ms`,
    {url},
    LogEventType.InternalAction,
  );

  return page;
};

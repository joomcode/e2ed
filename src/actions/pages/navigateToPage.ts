import {LogEventType} from '../../constants/internal';
import {log} from '../../utils/log';
import {getUserlandHooks} from '../../utils/userlandHooks';

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

  log(
    `Will navigate to the page "${PageClass.name}"`,
    {pageInstanceCreatedInMs, pageParams, routeParams, url},
    LogEventType.InternalAction,
  );

  await page.beforeNavigateToPage?.();

  const {navigateTo} = getUserlandHooks();

  await navigateTo(url);

  log(
    `Navigation to the page "${PageClass.name}" completed`,
    {pageParams, routeParams, url},
    LogEventType.InternalAction,
  );

  await page.waitForPageLoaded();

  await page.afterNavigateToPage?.();

  log(
    `Page "${PageClass.name}" loaded in ${Date.now() - startNavigateTimeInMs}ms`,
    {url},
    LogEventType.InternalAction,
  );

  return page;
};

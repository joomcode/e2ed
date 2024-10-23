import {LogEventType} from '../../constants/internal';
import {getDocumentUrl} from '../../utils/document';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';

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

  await page.navigateToPage(url);

  log(
    `Navigation to the page "${PageClass.name}" completed`,
    {pageParams, routeParams, url},
    LogEventType.InternalAction,
  );

  await page.waitForPageLoaded();

  const documentUrl = await getDocumentUrl();
  const isMatch = route.isMatchUrl(documentUrl);

  await page.assertPage(isMatch, documentUrl);

  await page.afterAssertPage?.();

  await page.afterNavigateToPage?.();

  const durationWithUnits = getDurationWithUnits(Date.now() - startNavigateTimeInMs);

  log(
    `Page "${PageClass.name}" loaded in ${durationWithUnits}`,
    {url},
    LogEventType.InternalAction,
  );

  return page;
};

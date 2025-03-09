import {LogEventType} from '../../constants/internal';
import {addPageToApiStatistics} from '../../utils/apiStatistics';
import {getDocumentUrl} from '../../utils/document';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';

import {createPageInstance} from './createPageInstance';

import type {
  AnyPageClassType,
  NavigateToOrAssertPageArgs,
  PageName,
  UtcTimeInMs,
} from '../../types/internal';

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
  const pageName = PageClass.name as PageName;

  log(
    `Will navigate to the page "${pageName}"`,
    {pageInstanceCreatedInMs, pageParams, routeParams, url},
    LogEventType.InternalAction,
  );

  await page.beforeNavigateToPage?.();

  await page.navigateToPage(url);

  log(
    `Navigation to the page "${pageName}" completed`,
    {pageParams, routeParams, url},
    LogEventType.InternalAction,
  );

  await page.waitForPageLoaded();

  const documentUrl = await getDocumentUrl();
  const isMatch = route.isMatchUrl(documentUrl);

  await page.assertPage(isMatch, documentUrl);

  await page.afterAssertPage?.();

  await page.afterNavigateToPage?.();

  const duration = Date.now() - startNavigateTimeInMs;
  const durationWithUnits = getDurationWithUnits(duration);

  log(`Page "${pageName}" loaded in ${durationWithUnits}`, {url}, LogEventType.InternalAction);

  addPageToApiStatistics({duration, pageName, url});

  return page;
};

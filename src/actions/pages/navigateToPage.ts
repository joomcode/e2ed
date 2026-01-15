import {LogEventType} from '../../constants/internal';
import {step} from '../../step';
import {addPageToApiStatistics} from '../../utils/apiStatistics';
import {assertValueIsDefined} from '../../utils/asserts';
import {getDocumentUrl} from '../../utils/document';
import {createPageInstance} from '../../utils/pageObjects';

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
  let page: InstanceType<SomePageClass> | undefined;

  await step(
    `Navigate to the page "${PageClass.name}"`,
    async () => {
      const startTimeInMs = Date.now() as UtcTimeInMs;

      page = await createPageInstance(PageClass, pageParams);

      const route = page.getRoute();
      const {routeParams} = route;
      const url = route.getUrl();
      const startNavigateTimeInMs = Date.now() as UtcTimeInMs;
      const pageInstanceCreatedInMs = startNavigateTimeInMs - startTimeInMs;
      const pageName = PageClass.name as PageName;

      await page.beforeNavigateToPage?.();

      await page.navigateToPage(url);

      await page.waitForPageLoaded();

      const documentUrl = await getDocumentUrl();
      const isMatch = route.isMatchUrl(documentUrl);

      await page.assertPage(isMatch, documentUrl);

      await page.afterAssertPage?.();

      await page.afterNavigateToPage?.();

      const duration = Date.now() - startNavigateTimeInMs;

      addPageToApiStatistics({duration, pageName, url});

      return {documentUrl, isMatch, pageInstanceCreatedInMs, routeParams, url};
    },
    {payload: {pageParams}, type: LogEventType.InternalAction},
  );

  assertValueIsDefined(page, 'page is defined', {name: PageClass.name, pageParams});

  return page;
};

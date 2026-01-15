import {LogEventStatus, LogEventType} from '../../constants/internal';
import {step} from '../../step';
import {assertValueIsDefined} from '../../utils/asserts';
import {getDocumentUrl} from '../../utils/document';
import {createPageInstance} from '../../utils/pageObjects';

import type {AnyPageClassType, NavigateToOrAssertPageArgs} from '../../types/internal';

/**
 * Asserts that we are on the expected page by page parameters.
 */
export const assertPage = async <SomePageClass extends AnyPageClassType>(
  ...args: NavigateToOrAssertPageArgs<SomePageClass>
): Promise<InstanceType<SomePageClass>> => {
  const [PageClass, pageParams] = args;
  let page: InstanceType<SomePageClass> | undefined;

  await step(
    `Asserts that the document url matches the page "${PageClass.name}"`,
    async () => {
      page = await createPageInstance(PageClass, pageParams);

      const route = page.getRoute();

      await page.beforeAssertPage?.();

      await page.waitForPageLoaded();

      const documentUrl = await getDocumentUrl();
      const isMatch = route.isMatchUrl(documentUrl);

      const logEventStatus = isMatch ? LogEventStatus.Passed : LogEventStatus.Failed;
      const {routeParams} = route;

      await page.assertPage(isMatch, documentUrl);

      await page.afterAssertPage?.();

      return {documentUrl, isMatch, logEventStatus, routeParams};
    },
    {payload: {pageParams}, type: LogEventType.InternalAction},
  );

  assertValueIsDefined(page, 'page is defined', {name: PageClass.name, pageParams});

  return page;
};

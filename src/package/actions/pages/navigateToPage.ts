import {LogEventType} from '../../constants/internal';
import {setPageLoaded} from '../../context/pageLoaded';
import {log} from '../../utils/log';

import {waitForInterfaceStabilization} from '../waitForInterfaceStabilization';

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
  const url = route.getUrl();
  const startNavigateTimeInMs = Date.now() as UtcTimeInMs;

  await log(
    `Will navigate to the page "${PageClass.name}"`,
    {
      pageInstanceCreatedInMs: startNavigateTimeInMs - startTimeInMs,
      pageParams,
      routeParams: route.params,
      url,
    },
    LogEventType.InternalCore,
  );

  if (page.beforeNavigateToPage) {
    await page.beforeNavigateToPage();
  }

  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../../hooks') = require('../../hooks');

  await hooks.navigateTo(url);

  await waitForInterfaceStabilization(page.pageStabilizationInterval);

  if (page.afterNavigateToPage) {
    await page.afterNavigateToPage();
  }

  await log(
    `Page "${PageClass.name}" loaded in ${Date.now() - startNavigateTimeInMs} ms`,
    {url},
    LogEventType.InternalCore,
  );

  setPageLoaded(true);

  return page;
};

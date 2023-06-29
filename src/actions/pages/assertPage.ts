import {LogEventStatus, LogEventType} from '../../constants/internal';
import {assertValueIsTrue} from '../../utils/asserts';
import {getDocumentUrl} from '../../utils/document';
import {log} from '../../utils/log';

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

  const route = page.getRoute();

  await page.beforeAssertPage?.();

  await page.waitForPageLoaded();

  const documentUrl = await getDocumentUrl();
  const isMatch = route.isMatchUrl(documentUrl);

  const logEventStatus = isMatch ? LogEventStatus.Passed : LogEventStatus.Failed;
  const message = `the document url matches the specified page "${PageClass.name}"`;
  const {routeParams} = route;
  const payload = {documentUrl, isMatch, pageParams, routeParams};

  log(`Asserts that ${message}`, {...payload, logEventStatus}, LogEventType.InternalAction);

  assertValueIsTrue(isMatch, message, payload);

  await page.afterAssertPage?.();

  return page;
};

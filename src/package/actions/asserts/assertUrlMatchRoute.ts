import {LogEventType} from '../../constants/internal';
import {expect} from '../../expect';
import {assertValueIsDefined, assertValueIsNotNull} from '../../utils/asserts';
import {log} from '../../utils/log';

import type {Route} from '../../Route';
import type {Url} from '../../types/internal';

type MaybeUrlOrPath = Url | string | null | undefined;

/**
 * Asserts that url or url path (which can be wrapped in a promise) match route.
 * TODO: support Smart Assertions.
 */
export const assertUrlMatchRoute = async (
  maybeUrlOrPath: MaybeUrlOrPath | Promise<MaybeUrlOrPath>,
  route: Route<unknown>,
): Promise<void> => {
  const routeUrl = route.getUrl();
  const urlOrPath = await maybeUrlOrPath;

  assertValueIsDefined(urlOrPath, 'urlOrPath is defined', {routeParams: route.params, routeUrl});
  assertValueIsNotNull(urlOrPath, 'urlOrPath is not null', {routeParams: route.params, routeUrl});

  await expect(routeUrl, 'route url contains the specified url or path').contains(urlOrPath);

  await log(
    'Assert that url or url path match route',
    {routeParams: route.params, routeUrl, urlOrPath},
    LogEventType.InternalAssert,
  );
};

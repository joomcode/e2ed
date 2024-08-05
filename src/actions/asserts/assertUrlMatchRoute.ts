import {LogEventType} from '../../constants/internal';
import {expect} from '../../expect';
import {assertValueIsDefined, assertValueIsNotNull} from '../../utils/asserts';
import {log} from '../../utils/log';

import type {Route} from '../../Route';
import type {Url} from '../../types/internal';

type MaybeUrlOrPath = Url | string | null | undefined;

/**
 * Asserts that url or url path (which can be wrapped in a promise) match route.
 */
export const assertUrlMatchRoute = async (
  maybeUrlOrPath: MaybeUrlOrPath | Promise<MaybeUrlOrPath>,
  route: Route<unknown>,
): Promise<void> => {
  const {routeParams} = route;
  const routeUrl = route.getUrl();
  const urlOrPath = await maybeUrlOrPath;

  assertValueIsDefined(urlOrPath, 'urlOrPath is defined', {routeParams, routeUrl});
  assertValueIsNotNull(urlOrPath, 'urlOrPath is not null', {routeParams, routeUrl});

  log(
    'Asserts that url or url path match route',
    {routeParams, routeUrl, urlOrPath},
    LogEventType.InternalAssert,
  );

  // TODO: support Smart Assertions
  await expect(routeUrl, 'route url contains the specified url or url path').contains(urlOrPath);
};

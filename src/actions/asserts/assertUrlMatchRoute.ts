import {LogEventType} from '../../constants/internal';
import {expect} from '../../expect';
import {step} from '../../step';
import {assertValueIsDefined, assertValueIsNotNull} from '../../utils/asserts';

import type {Route} from '../../Route';
import type {MaybePromise, Url} from '../../types/internal';

type MaybeUrlOrPath = Url | string | null | undefined;

/**
 * Asserts that url or url path (which can be wrapped in a promise) match route.
 */
export const assertUrlMatchRoute = (
  maybeUrlOrPath: MaybePromise<MaybeUrlOrPath>,
  route: Route<unknown>,
): Promise<void> =>
  step(
    'Asserts that url or url path match route',
    async () => {
      const {routeParams} = route;
      const routeUrl = route.getUrl();
      const urlOrPath = await maybeUrlOrPath;

      assertValueIsDefined(urlOrPath, 'urlOrPath is defined', {routeParams, routeUrl});
      assertValueIsNotNull(urlOrPath, 'urlOrPath is not null', {routeParams, routeUrl});

      // TODO: support Smart Assertions
      await expect(routeUrl, 'route url contains the specified url or url path').contains(
        urlOrPath,
      );

      return {routeParams, routeUrl, urlOrPath};
    },
    {type: LogEventType.InternalAssert},
  );

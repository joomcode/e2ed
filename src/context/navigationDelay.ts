import {useContext} from '../useContext';

import type {NavigationDelay} from '../types/internal';

/**
 * Get and set raw `NavigationDelay` object (or `undefined`).
 * @internal
 */
const [getRawNavigationDelay, setRawNavigationDelay] = useContext<NavigationDelay>();

/**
 * Get `NavigationDelay` object.
 * @internal
 */
export const getNavigationDelay = (): NavigationDelay => {
  const maybeNavigationDelay = getRawNavigationDelay();

  if (maybeNavigationDelay !== undefined) {
    return maybeNavigationDelay;
  }

  const navigationDelay = {promise: undefined, reasonsCount: 0, resolve: undefined};

  setRawNavigationDelay(navigationDelay);

  return navigationDelay;
};

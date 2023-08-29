import {LOCATOR_KEY} from '../../constants/internal';

import type {Selector} from '../../types/internal';

/**
 * Get string locator from selector if any.
 */
export const getLocatorFromSelector = (selector: Selector): string | undefined =>
  // @ts-expect-error: native Selector type does not have LOCATOR_KEY
  selector[LOCATOR_KEY] as string | undefined;

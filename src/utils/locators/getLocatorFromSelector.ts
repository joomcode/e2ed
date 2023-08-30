import {LOCATOR_KEY} from '../../constants/internal';

import type {Selector} from '../../types/internal';

/**
 * Get string locator from selector if any.
 */
export const getLocatorFromSelector = (selector: Selector): string | undefined =>
  selector?.[LOCATOR_KEY] as string | undefined;

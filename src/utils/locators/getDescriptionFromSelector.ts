import {DESCRIPTION_KEY} from '../../constants/internal';

import type {Selector} from '../../types/internal';

/**
 * Get string description of selector if any.
 */
export const getDescriptionFromSelector = (selector: Selector): string | undefined =>
  selector?.[DESCRIPTION_KEY] as string | undefined;

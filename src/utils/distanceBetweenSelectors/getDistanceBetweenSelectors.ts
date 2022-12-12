import {getHorizontalDistanceBetweenSelectors} from './getHorizontalDistanceBetweenSelectors';
import {getVerticalDistanceBetweenSelectors} from './getVerticalDistanceBetweenSelectors';

import type {Selector} from '../../types/internal';

/**
 * Returns distance between selectors in pixels.
 * TODO: support Smart Assertions.
 */
export const getDistanceBetweenSelectors = async (
  selectorA: Selector,
  selectorB: Selector,
): Promise<number> => {
  const horizontal = await getHorizontalDistanceBetweenSelectors(selectorA, selectorB);
  const vertical = await getVerticalDistanceBetweenSelectors(selectorA, selectorB);

  return Math.sqrt(horizontal ** 2 + vertical ** 2);
};

import {LogEventType} from '../../../constants/internal';
import {expect} from '../../../expect';
import {getDistanceBetweenSelectors} from '../../../utils/distanceBetweenSelectors';
import {log} from '../../../utils/log';

import type {Selector} from '../../../types/internal';

/**
 * Asserts that distance between selectors is less than or equal
 * to value of maxDistance (in pixels).
 */
export const assertDistanceBetweenSelectorsLte = async (
  selectorA: Selector,
  selectorB: Selector,
  maxDistance: number,
): Promise<void> => {
  const distance = await getDistanceBetweenSelectors(selectorA, selectorB);
  const message = `distance between selectors is less than or equal to ${maxDistance}`;

  log(`Assert that ${message}`, {distance, maxDistance}, LogEventType.InternalAssert);

  // TODO: support Smart Assertions
  await expect(distance, message).lte(maxDistance);
};

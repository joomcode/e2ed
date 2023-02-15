import {LogEventType} from '../../../constants/internal';
import {expect} from '../../../expect';
import {getDistanceBetweenSelectors} from '../../../utils/distanceBetweenSelectors';
import {log} from '../../../utils/log';

import type {Selector} from '../../../types/internal';

/**
 * Asserts that distance between selectors is greater than or equal
 * to value of maxDistance (in pixels).
 */
export const assertDistanceBetweenSelectorsGte = async (
  selectorA: Selector,
  selectorB: Selector,
  minDistance: number,
): Promise<void> => {
  const distance = await getDistanceBetweenSelectors(selectorA, selectorB);
  const message = `distance between selectors is greater than or equal to ${minDistance}`;

  log(`Asserts that ${message}`, {distance, minDistance}, LogEventType.InternalAssert);

  // TODO: support Smart Assertions
  await expect(distance, message).gte(minDistance);
};

import {LogEventType} from '../../../constants/internal';
import {expect} from '../../../expect';
import {step} from '../../../step';
import {getDistanceBetweenSelectors} from '../../../utils/distanceBetweenSelectors';

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
  const message = `distance between selectors is less than or equal to ${maxDistance}px`;

  await step(
    `Asserts that ${message}`,
    async () => {
      const distance = await getDistanceBetweenSelectors(selectorA, selectorB);

      // TODO: support Smart Assertions
      await expect(distance, message).lte(maxDistance);

      return {distance};
    },
    {payload: {maxDistance}, type: LogEventType.InternalAction},
  );
};

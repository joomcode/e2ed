import {LogEventType} from '../../../constants/internal';
import {expect} from '../../../expect';
import {step} from '../../../step';
import {getDistanceBetweenSelectors} from '../../../utils/distanceBetweenSelectors';

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
  const message = `distance between selectors is greater than or equal to ${minDistance}px`;

  await step(
    `Asserts that ${message}`,
    async () => {
      const distance = await getDistanceBetweenSelectors(selectorA, selectorB);

      // TODO: support Smart Assertions
      await expect(distance, message).gte(minDistance);

      return {distance};
    },
    {payload: {minDistance}, type: LogEventType.InternalAssert},
  );
};

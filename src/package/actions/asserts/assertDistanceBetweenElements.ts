import {LogEventType} from '../../constants/internal';
import {expect} from '../../expect';
import {getDistanceBetweenElements} from '../../utils/distanceBetweenElements';
import {log} from '../../utils/log';

import type {Selector} from '../../types/internal';

/**
 * Asserts that distance between elements is less then value of maxDistance.
 */
export const assertDistanceBetweenElements = async (
  a: Selector,
  b: Selector,
  maxDistance: number,
): Promise<void> => {
  const distance = await getDistanceBetweenElements(a, b);

  // TODO(@uid11): support Smart Assertions.
  await expect(
    distance <= maxDistance,
    `distance between elements is less or equal to ${maxDistance}.`,
  ).ok();
  await log(
    'Assert that distance between elements is less or equal to maxDistance',
    {distance, maxDistance},
    LogEventType.InternalAssert,
  );
};

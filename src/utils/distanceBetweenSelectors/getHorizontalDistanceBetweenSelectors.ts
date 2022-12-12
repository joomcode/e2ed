import type {Selector} from '../../types/internal';

/**
 * Returns horizontal distance between selectors in pixels.
 * TODO: support Smart Assertions.
 */
export const getHorizontalDistanceBetweenSelectors = async (
  selectorA: Selector,
  selectorB: Selector,
): Promise<number> => {
  const boundingClientRectOfSelectorA = await selectorA.boundingClientRect;
  const boundingClientRectOfSelectorB = await selectorB.boundingClientRect;

  const {left: aLeft, right: aRight} = boundingClientRectOfSelectorA;
  const {left: bLeft, right: bRight} = boundingClientRectOfSelectorB;

  if (bLeft > aRight) {
    return bLeft - aRight;
  }

  if (aLeft > bRight) {
    return aLeft - bRight;
  }

  return 0;
};

import type {Selector} from '../../types/internal';

/**
 * Returns vertical distance between selectors in pixels.
 * TODO: support Smart Assertions.
 */
export const getVerticalDistanceBetweenSelectors = async (
  selectorA: Selector,
  selectorB: Selector,
): Promise<number> => {
  const boundingClientRectOfSelectorA = await selectorA.boundingClientRect;
  const boundingClientRectOfSelectorB = await selectorB.boundingClientRect;

  const {top: aTop, bottom: aBottom} = boundingClientRectOfSelectorA;
  const {top: bTop, bottom: bBottom} = boundingClientRectOfSelectorB;

  if (aTop > bBottom) {
    return aTop - bBottom;
  }

  if (bTop > aBottom) {
    return bTop - aBottom;
  }

  return 0;
};

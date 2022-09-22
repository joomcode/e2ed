import type {Selector} from '../types/internal';

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

  return Math.sqrt(horizontal * horizontal + vertical * vertical);
};

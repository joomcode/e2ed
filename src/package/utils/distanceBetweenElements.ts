import type {Selector} from '../types/internal';

/**
 * Returns vertical distance between elements a and b.
 */
const getVerticalDistanceBetweenElements = async (a: Selector, b: Selector): Promise<number> => {
  const aTop = (await a.boundingClientRect).top;
  const aBottom = (await a.boundingClientRect).bottom;

  const bTop = (await b.boundingClientRect).top;
  const bBottom = (await b.boundingClientRect).bottom;

  if (aTop > bBottom) {
    return aTop - bBottom;
  }
  if (bTop > aBottom) {
    return bTop - aBottom;
  }

  return 0;
};

/**
 * Returns horizontal distance between elements a and b.
 */
const getHorizontalDistanceBetweenElements = async (a: Selector, b: Selector): Promise<number> => {
  const aLeft = (await a.boundingClientRect).left;
  const aRight = (await a.boundingClientRect).right;

  const bLeft = (await b.boundingClientRect).left;
  const bRight = (await b.boundingClientRect).right;

  if (bLeft > aRight) {
    return bLeft - aRight;
  }
  if (aLeft > bRight) {
    return aLeft - bRight;
  }

  return 0;
};

/**
 * Returns distance between elements a and b.
 */
export const getDistanceBetweenElements = async (a: Selector, b: Selector): Promise<number> => {
  const horizontal = await getHorizontalDistanceBetweenElements(a, b);
  const vertical = await getVerticalDistanceBetweenElements(a, b);

  return Math.sqrt(horizontal * horizontal + vertical * vertical);
};

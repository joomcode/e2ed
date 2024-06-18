import {Selector as SelectorClass} from '../selectors';

import type {Selector} from '../../types/internal';

/**
 * Returns `true`, if the selector is entirely in the viewport
 * (all selector points are in the viewport), and `false` otherwise.
 */
export const isSelectorEntirelyInViewport = async (selector: Selector): Promise<boolean> => {
  const htmlElementSelector = new SelectorClass('html');

  const {height: clientHeight, width: clientWidth} = await htmlElementSelector.boundingClientRect;

  const {bottom, left, right, top} = await selector.boundingClientRect;

  return top >= 0 && bottom <= clientHeight && left >= 0 && right <= clientWidth;
};

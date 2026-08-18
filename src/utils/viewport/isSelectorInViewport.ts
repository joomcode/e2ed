import {requirePlaywright} from '../require';

import type {Selector} from '../../types/internal';

/**
 * Returns `true`, if the selector is in the viewport
 * (intersects with the viewport at least in one point), and `false` otherwise.
 */
export const isSelectorInViewport = async (selector: Selector): Promise<boolean> => {
  try {
    const {expect: playwrightExpect} = requirePlaywright();

    await playwrightExpect(selector.getPlaywrightLocator()).toBeInViewport({timeout: 1});

    return true;
  } catch {
    return false;
  }
};

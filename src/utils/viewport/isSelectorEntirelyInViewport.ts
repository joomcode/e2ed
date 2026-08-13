import type {Selector} from '../../types/internal';

/**
 * Returns `true`, if the selector is entirely in the viewport
 * (all selector points are in the viewport), and `false` otherwise.
 */
export const isSelectorEntirelyInViewport = async (selector: Selector): Promise<boolean> => {
  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const playwrightExpect = (require('@playwright/test') as typeof import('@playwright/test'))
      .expect;

    await playwrightExpect(selector.getPlaywrightLocator()).toBeInViewport({
      ratio: 1,
      timeout: 1,
    });

    return true;
  } catch {
    return false;
  }
};

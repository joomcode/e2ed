import type {Selector} from '../../types/internal';

/**
 * Returns `true`, if the selector is in the viewport
 * (intersects with the viewport at least in one point), and `false` otherwise.
 */
export const isSelectorInViewport = async (selector: Selector): Promise<boolean> => {
  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const playwrightExpect = (require('@playwright/test') as typeof import('@playwright/test'))
      .expect;

    await playwrightExpect(selector.getPlaywrightLocator()).toBeInViewport({timeout: 1});

    return true;
  } catch {
    return false;
  }
};

import type {CreateSelector, Selector} from '../types/internal';

export const createSelectorByCssCreator = (
  createSelector: CreateSelector,
): typeof createSelectorByCss => {
  /**
   * Creates selector of page elements by CSS selector.
   */
  const createSelectorByCss = (cssSelectorString: string): Selector =>
    createSelector(cssSelectorString);

  return createSelectorByCss;
};

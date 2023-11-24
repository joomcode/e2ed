import type {CreateSelector, CreateSelectorByCss, Selector} from '../types/internal';

/**
 * Creates `createSelectorByCss` function.
 * @internal
 */
export const createSelectorByCssCreator = (createSelector: CreateSelector): CreateSelectorByCss => {
  /**
   * Creates selector of page elements by CSS selector.
   */
  const createSelectorByCss = (cssSelectorString: string): Selector =>
    createSelector(cssSelectorString);

  return createSelectorByCss;
};

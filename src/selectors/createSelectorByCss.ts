import type {CreateSelector, RawSelector, SelectorCustomMethods} from '../types/internal';

export const createSelectorByCssCreator = <CustomMethods extends SelectorCustomMethods = {}>(
  createSelector: CreateSelector<CustomMethods>,
): typeof createSelectorByCss => {
  /**
   * Creates selector of page elements by CSS selector.
   */
  const createSelectorByCss = (cssSelectorString: string): RawSelector<CustomMethods> =>
    createSelector(cssSelectorString);

  return createSelectorByCss;
};

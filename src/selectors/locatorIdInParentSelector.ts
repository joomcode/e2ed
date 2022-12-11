import type {Selector} from '../types/internal';

/**
 * Get testId selector in parent.
 */
export const locatorIdInParentSelector = (id: string, parent: Selector): Selector =>
  parent.find(`[data-testid="${id}"]`);

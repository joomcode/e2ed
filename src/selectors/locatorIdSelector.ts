import {createSelectorByCss} from './createSelectorByCss';

import type {Selector} from '../types/internal';

/**
 * Selector of locator elements (with data-testid attribute) by locator id.
 */
export const locatorIdSelector = (id: string): Selector =>
  createSelectorByCss(`[data-testid='${id}']`);

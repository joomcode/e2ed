import {cssSelector} from './cssSelector';

import type {Selector} from '../types/internal';

/**
 * Selector of locator elements (with data-testid attribute) by locator id.
 */
export const locatorIdSelector = (id: string): Selector => cssSelector(`[data-testid='${id}']`);

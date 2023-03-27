import {createSelectorByCss} from 'e2ed/selectors';

import type {Selector} from 'e2ed/types';

/**
 * Selector of input element by name.
 */
export const inputSelector = (name: string): Selector =>
  createSelectorByCss(`input[name="${name}"]`);

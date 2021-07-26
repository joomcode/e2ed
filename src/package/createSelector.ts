import {Selector} from 'testcafe';

import type {Selector as SelectorType} from './types/internal';

export const createSelector = (...args: Parameters<typeof Selector>): SelectorType =>
  Selector(...args);

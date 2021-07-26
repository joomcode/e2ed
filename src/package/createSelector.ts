import {Selector} from 'testcafe';

import type {Selector as SelectorType} from './types';

export const createSelector = (...args: Parameters<typeof Selector>): SelectorType =>
  Selector(...args);

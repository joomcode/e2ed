import {createSelector} from '../createSelector';

import type {Selector} from '../types/internal';

export const cssSelector = (locator: string): Selector => createSelector(locator);

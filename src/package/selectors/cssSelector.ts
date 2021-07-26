import {createSelector} from '../createSelector';

import type {Selector} from '../types';

export const cssSelector = (locator: string): Selector => createSelector(locator);

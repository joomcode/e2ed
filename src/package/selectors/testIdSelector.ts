import {createSelector} from '../createSelector';

import type {Selector} from '../types/internal';

export const testIdSelector = (id: string): Selector => createSelector(`[data-testid='${id}']`);

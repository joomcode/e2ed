import {createSelector} from 'e2ed';

import type {Selector} from 'e2ed/types';

export const inputSelector = (name: string): Selector => createSelector(`input[name=${name}]`);

import type {Inner} from 'testcafe-without-typecheck';

import type {DESCRIPTION_KEY} from '../constants/internal';

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = Inner.SelectorAPI & {[DESCRIPTION_KEY]?: string};

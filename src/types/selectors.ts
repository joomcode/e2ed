import type {Inner} from 'testcafe-without-typecheck';

import type {LOCATOR_KEY} from '../constants/internal';

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = Inner.SelectorAPI & {[LOCATOR_KEY]?: string};

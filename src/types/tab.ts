import type {Page} from '@playwright/test';

import type {Brand} from './brand';

/**
 * Internal presentation of `Tab`.
 * @internal
 */
export type InternalTab = Partial<Tab> & Readonly<{page: Page}>;

/**
 * Tab with page (in test).
 */
export type Tab = Brand<object, 'Tab'>;

import type {CREATE_PAGE_TOKEN} from '../constants/internal';
import type {Page} from '../Page';

import type {GetParamsType, OneOrTwoArgs} from './utils';

/**
 * Arguments of page class constructor by page parameters type.
 */
export type PageClassTypeArgs<PageParams> = OneOrTwoArgs<typeof CREATE_PAGE_TOKEN, PageParams>;

/**
 * Page class type by page parameters type.
 */
export type PageClassType<PageParams> = {
  new (...args: PageClassTypeArgs<PageParams>): Page<PageParams>;
  prototype: Page<PageParams>;
};

/**
 * Base page class type for any page.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyPageClassType = PageClassType<any>;

/**
 * Arguments of navigateToPage and assertPage functions.
 */
export type NavigateToOrAssertPageArgs<SomePageClass extends AnyPageClassType> = OneOrTwoArgs<
  SomePageClass,
  GetParamsType<InstanceType<SomePageClass>>
>;

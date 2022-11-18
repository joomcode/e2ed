import type {CREATE_PAGE_TOKEN} from '../constants/internal';
import type {Page} from '../Page';

import type {Class} from './class';
import type {Any, GetParamsType, OneOrTwoArgs} from './utils';

/**
 * Arguments of page class constructor by page parameters type.
 */
export type PageClassTypeArgs<PageParams> = OneOrTwoArgs<typeof CREATE_PAGE_TOKEN, PageParams>;

/**
 * Page class type by page parameters type.
 */
export type PageClassType<PageParams> = Class<PageClassTypeArgs<PageParams>, Page<PageParams>>;

/**
 * Base page class type for any page.
 */
export type AnyPageClassType = PageClassType<Any>;

/**
 * Arguments of navigateToPage and assertPage functions.
 */
export type NavigateToOrAssertPageArgs<SomePageClass extends AnyPageClassType> = OneOrTwoArgs<
  SomePageClass,
  GetParamsType<InstanceType<SomePageClass>>
>;

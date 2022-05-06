import type {CREATE_PAGE_TOKEN} from '../constants/internal';
import type {Page} from '../Page';

import type {GetParamsType} from './utils';

/**
 * Type of navigateToPage and assertPage functions.
 */
export type NavigateToOrAssertPage = <SomePageClass extends PageClass<object>>(
  PageClass: SomePageClass,
  pageParams: GetParamsType<InstanceType<SomePageClass>>,
) => Promise<InstanceType<SomePageClass>>;

/**
 * Page class type by page parameters type.
 */
export type PageClass<PageParams> = {
  new (createPageToken: typeof CREATE_PAGE_TOKEN, pageParams: PageParams): Page<PageParams>;
  prototype: Page<PageParams>;
};

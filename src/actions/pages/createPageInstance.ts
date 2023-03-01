import {CREATE_PAGE_TOKEN} from '../../constants/internal';

import type {AnyPageClassType} from '../../types/internal';

/**
 * Creates page instance by page class and page parameters.
 * @internal
 */
export const createPageInstance = async <SomePageClass extends AnyPageClassType>(
  PageClass: SomePageClass,
  pageParams: unknown,
): Promise<InstanceType<SomePageClass>> => {
  const page = new PageClass(CREATE_PAGE_TOKEN, pageParams) as InstanceType<SomePageClass>;

  if (page.init) {
    await page.init();
  }

  return page;
};

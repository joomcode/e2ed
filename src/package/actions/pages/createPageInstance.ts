import {CREATE_PAGE_TOKEN} from '../../constants/internal';

import type {PageClass} from '../../types/internal';

/**
 * Create page instancet by page class and page parameters.
 * @internal
 */
export const createPageInstance = async <PageParams>(
  PageClass: PageClass<PageParams>,
  pageParams: PageParams,
): Promise<InstanceType<PageClass<PageParams>>> => {
  const page = new PageClass(CREATE_PAGE_TOKEN, pageParams);

  if (page.init) {
    await page.init();
  }

  return page;
};

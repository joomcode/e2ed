import {CREATE_PAGE_TOKEN} from '../../constants/internal';

import type {PageClassType} from '../../types/internal';

/**
 * Create page instance by page class and page parameters.
 * @internal
 */
export const createPageInstance = async <PageParams>(
  PageClass: PageClassType<PageParams>,
  pageParams: PageParams,
): Promise<InstanceType<PageClassType<PageParams>>> => {
  const page = new PageClass(CREATE_PAGE_TOKEN, pageParams);

  if (page.init) {
    await page.init();
  }

  return page;
};

import {navigateToUrl, setPageCookiesAndNavigateToUrl} from 'e2ed/actions';
import {clearPageCookies, getPageCookies} from 'e2ed/context';

import type {Url} from 'e2ed/types';

/**
 * This hook is used inside the navigateToPage function to navigate to the page
 * under the already computed url.
 * Use context (e2ed/context) to get parameters inside a hook.
 */
export const navigateTo = async (url: Url): Promise<void> => {
  const pageCookies = getPageCookies();

  if (pageCookies === undefined) {
    // As with all hooks, you can replace it with your own implementation.
    await navigateToUrl(url, {skipLogs: true});
  } else {
    clearPageCookies();

    await setPageCookiesAndNavigateToUrl(url, pageCookies);
  }
};

import {
  setPageCookiesAndNavigateToUrl,
  setPageRequestHeadersAndNavigateToUrl,
} from 'autotests/actions';
import {
  clearPageCookies,
  clearPageRequestHeaders,
  getPageCookies,
  getPageRequestHeaders,
} from 'autotests/context';
import {navigateToUrl} from 'e2ed/actions';

import type {NavigateTo} from 'autotests/types';

/**
 * This hook is used inside the `navigateToPage` function to navigate to the page
 * under the already computed url.
 * Use context (`e2ed/context`) to get parameters inside a hook.
 */
export const navigateTo: NavigateTo = async (url) => {
  const pageCookies = getPageCookies();
  const pageRequestHeaders = getPageRequestHeaders();

  if (pageCookies !== undefined) {
    clearPageCookies();

    await setPageCookiesAndNavigateToUrl(url, pageCookies);
  } else if (pageRequestHeaders !== undefined) {
    clearPageRequestHeaders();

    await setPageRequestHeadersAndNavigateToUrl(url, pageRequestHeaders);
  } else {
    await navigateToUrl(url, {skipLogs: true});
  }
};

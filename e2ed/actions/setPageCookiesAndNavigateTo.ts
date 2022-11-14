import {setHeadersAndNavigateTo} from 'e2ed/actions';
import {LogEventType} from 'e2ed/constants';
import {log, replaceSetCookie} from 'e2ed/utils';

import type {Cookie, Headers, Url} from 'e2ed/types';

/**
 * Navigate to the page and set custom page cookies.
 */
export const setPageCookiesAndNavigateTo = async (
  url: Url,
  pageCookies: readonly Cookie[],
): Promise<void> => {
  const mapResponseHeaders = (headers: Headers): Headers => {
    let setCookies = headers['set-cookie'];

    if (setCookies === undefined) {
      setCookies = [];
    }

    for (const cookie of pageCookies) {
      setCookies = replaceSetCookie(setCookies, cookie);
    }

    return {'set-cookie': setCookies};
  };

  await log(`Navigate to ${url} and set page cookie`, {pageCookies, url}, LogEventType.Action);

  await setHeadersAndNavigateTo(url, {mapResponseHeaders});
};

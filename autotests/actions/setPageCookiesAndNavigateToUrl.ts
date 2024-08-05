import {setHeadersAndNavigateToUrl} from 'e2ed/actions';
import {LogEventType} from 'e2ed/constants';
import {getHeaderValue, log, replaceSetCookie} from 'e2ed/utils';

import type {Cookie, SetCookieHeaderString, StringHeaders, Url} from 'e2ed/types';

/**
 * Navigate to the url and set custom page cookies.
 */
export const setPageCookiesAndNavigateToUrl = async (
  url: Url,
  pageCookies: readonly Cookie[],
): Promise<void> => {
  const mapResponseHeaders = (headers: StringHeaders): StringHeaders => {
    let cookiesArray: SetCookieHeaderString[] = [];
    const setCookies = getHeaderValue(headers, 'set-cookie');

    if (setCookies !== undefined) {
      cookiesArray.push(setCookies as SetCookieHeaderString);
    }

    for (const cookie of pageCookies) {
      cookiesArray = replaceSetCookie(cookiesArray, cookie);
    }

    return {'set-cookie': cookiesArray.join('\n')};
  };

  log(`Navigate to ${url} and set page cookie`, {pageCookies, url}, LogEventType.Action);

  await setHeadersAndNavigateToUrl(url, {mapResponseHeaders});
};

import {setHeadersAndNavigateToUrl} from 'e2ed/actions';
import {LogEventType} from 'e2ed/constants';
import {getHeaderValue, log, replaceSetCookie} from 'e2ed/utils';

import type {Cookie, NavigationReturn, SetCookieHeaderString, StringHeaders, Url} from 'e2ed/types';

type Options = Readonly<{
  pageCookies: readonly Cookie[];
  timeout?: number;
}>;

/**
 * Navigates to the url and set custom page cookies.
 */
export const setPageCookiesAndNavigateToUrl = (
  url: Url,
  {pageCookies, timeout}: Options,
): Promise<NavigationReturn> => {
  const mapResponseHeaders = (headers: StringHeaders): StringHeaders => {
    const setCookies = getHeaderValue(headers, 'set-cookie');

    let cookiesArray = (setCookies ?? '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean) as SetCookieHeaderString[];

    for (const cookie of pageCookies) {
      cookiesArray = replaceSetCookie(cookiesArray, cookie);
    }

    return {'set-cookie': cookiesArray.join('\n')};
  };

  log(`Navigate to ${url} and set page cookie`, {pageCookies, url}, LogEventType.Action);

  return setHeadersAndNavigateToUrl(
    url,
    {mapResponseHeaders},
    timeout !== undefined ? {timeout} : undefined,
  );
};

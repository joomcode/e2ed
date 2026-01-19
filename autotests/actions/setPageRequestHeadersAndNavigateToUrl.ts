import {setHeadersAndNavigateToUrl} from 'e2ed/actions';
import {LogEventType} from 'e2ed/constants';
import {log} from 'e2ed/utils';

import type {NavigationReturn, StringHeaders, Url} from 'e2ed/types';

type Options = Readonly<{
  pageRequestHeaders: StringHeaders;
  timeout?: number;
}>;

/**
 * Navigates to the url and set additional page request headers.
 */
export const setPageRequestHeadersAndNavigateToUrl = (
  url: Url,
  {pageRequestHeaders, timeout}: Options,
): Promise<NavigationReturn> => {
  const mapRequestHeaders = (): StringHeaders => pageRequestHeaders;

  log(
    `Navigate to ${url} and set page request headers`,
    {pageRequestHeaders, url},
    LogEventType.Action,
  );

  return setHeadersAndNavigateToUrl(
    url,
    {mapRequestHeaders},
    timeout !== undefined ? {timeout} : undefined,
  );
};

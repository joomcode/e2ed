import {setHeadersAndNavigateToUrl} from 'e2ed/actions';
import {LogEventType} from 'e2ed/constants';
import {log} from 'e2ed/utils';

import type {Headers, Url} from 'e2ed/types';

/**
 * Navigate to the url and set additional page request headers.
 */
export const setPageRequestHeadersAndNavigateToUrl = async (
  url: Url,
  pageRequestHeaders: Headers,
): Promise<void> => {
  const mapRequestHeaders = (): Headers => pageRequestHeaders;

  log(
    `Navigate to ${url} and set page request headers`,
    {pageRequestHeaders, url},
    LogEventType.Action,
  );

  await setHeadersAndNavigateToUrl(url, {mapRequestHeaders});
};

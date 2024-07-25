import type {Request} from '@playwright/test';

import type {Headers, Method, Url} from '../../types/internal';

type Return = Readonly<{
  headers: Headers;
  method: Method;
  url: Url;
}>;

/**
 * Get main request options for display in logs.
 * @internal
 */
export const getMainRequestOptions = (playwrightRequest: Request): Return => {
  const headers = playwrightRequest.headers();
  const method = playwrightRequest.method() as Method;
  const url = playwrightRequest.url() as Url;

  return {headers, method, url};
};

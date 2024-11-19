import type {Request as PlaywrightRequest} from '@playwright/test';

import type {RequestHookContextId} from '../../types/internal';

/**
 * Get `RequestHookContextId` from Playwright request.
 * @internal
 */
export const getRequestHookContextId = (
  playwrightRequest: PlaywrightRequest,
): RequestHookContextId => {
  const request = playwrightRequest as {_guid?: string; url: () => string};

  // eslint-disable-next-line no-underscore-dangle
  return String(request._guid) as RequestHookContextId;
};

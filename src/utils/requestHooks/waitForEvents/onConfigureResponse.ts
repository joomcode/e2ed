import {REQUEST_HOOK_CONTEXT_ID_KEY, REQUEST_HOOK_CONTEXT_KEY} from '../../../constants/internal';

import type {
  RequestHookConfigureResponseEvent,
  RequestHookContextId,
} from '../../../types/internal';

/**
 * `_onConfigureResponse` event handler.
 * Set `requestHookContextId` to response headers object.
 * @internal
 */
export const onConfigureResponse = (event: RequestHookConfigureResponseEvent): void => {
  const requestHookContext = event[REQUEST_HOOK_CONTEXT_KEY];
  const requestHookContextId = requestHookContext?.[REQUEST_HOOK_CONTEXT_ID_KEY];

  // eslint-disable-next-line no-underscore-dangle
  const headers = requestHookContext?._ctx?.destRes?.headers;

  if (headers && requestHookContextId) {
    (headers as {[REQUEST_HOOK_CONTEXT_ID_KEY]: RequestHookContextId})[
      REQUEST_HOOK_CONTEXT_ID_KEY
    ] = requestHookContextId;
  }
};

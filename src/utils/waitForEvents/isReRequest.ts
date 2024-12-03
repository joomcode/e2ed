import {URL} from 'node:url';

import type {RequestWithUtcTimeInMs} from '../../types/internal';

/**
 * Returns `true` if request is re-request of base request, and `false` otherwise.
 * We should not wait for such requests to complete because they will not receive a response.
 * @internal
 */
export const isReRequest = (
  reRequest: RequestWithUtcTimeInMs,
  baseRequest: RequestWithUtcTimeInMs,
): boolean => {
  if (reRequest.method !== baseRequest.method) {
    return false;
  }

  const reRequestUrlObject = new URL(reRequest.url);
  const baseRequestUrlObject = new URL(baseRequest.url);

  if (reRequestUrlObject.origin !== baseRequestUrlObject.origin) {
    return false;
  }

  if (reRequestUrlObject.search !== baseRequestUrlObject.search) {
    return false;
  }

  const reRequestQueryKeys = [...reRequestUrlObject.searchParams.keys()].join('&');
  const baseRequestQueryKeys = [...baseRequestUrlObject.searchParams.keys()].join('&');

  if (reRequestQueryKeys !== baseRequestQueryKeys) {
    return false;
  }

  return true;
};

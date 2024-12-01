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
  if (reRequest.url !== baseRequest.url) {
    return false;
  }

  if (reRequest.method !== baseRequest.method) {
    return false;
  }

  return true;
};

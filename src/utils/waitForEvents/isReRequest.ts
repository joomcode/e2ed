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

  const baseHeaders = baseRequest.requestHeaders;
  const headers = reRequest.requestHeaders;

  const headersNames = Object.keys(headers);
  const baseHeadersNames = Object.keys(baseHeaders);

  if (headersNames.length < baseHeadersNames.length) {
    return false;
  }

  for (const headerName of baseHeadersNames) {
    if (
      !(headerName in headers) ||
      String(baseHeaders[headerName]) !== String(headers[headerName])
    ) {
      return false;
    }
  }

  return true;
};

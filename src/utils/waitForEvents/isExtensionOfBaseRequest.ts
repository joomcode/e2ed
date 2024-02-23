import type {RequestWithUtcTimeInMs} from '../../types/internal';

const maxIntervalBetweenExtensionAndBaseRequests = 100;

/**
 * Returns `true` if request is an "extension" (re-request) of base request, and `false` otherwise.
 * We should not wait for such requests to complete because they will not receive a response.
 * @internal
 */
export const isExtensionOfBaseRequest = (
  request: RequestWithUtcTimeInMs,
  baseRequest: RequestWithUtcTimeInMs,
): boolean => {
  if (request.url !== baseRequest.url) {
    return false;
  }

  if (request.method !== 'GET' || baseRequest.method !== 'GET') {
    return false;
  }

  if (
    request.utcTimeInMs < baseRequest.utcTimeInMs ||
    request.utcTimeInMs > baseRequest.utcTimeInMs + maxIntervalBetweenExtensionAndBaseRequests
  ) {
    return false;
  }

  const baseHeaders = baseRequest.requestHeaders;
  const headers = request.requestHeaders;

  const headersNames = Object.keys(headers);
  const baseHeadersNames = Object.keys(baseHeaders);

  if (headersNames.length <= baseHeadersNames.length) {
    return false;
  }

  for (const headerName of baseHeadersNames) {
    if (!(headerName in headers) || baseHeaders[headerName] !== headers[headerName]) {
      return false;
    }
  }

  return true;
};

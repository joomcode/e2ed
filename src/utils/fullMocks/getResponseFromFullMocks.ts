import {assertValueIsDefined, assertValueIsNotNull} from '../asserts';
import {getFullPackConfig} from '../config';
import {getContentJsonHeaders} from '../http';

import type {FullMocksRouteParams, Request, Response} from '../../types/internal';

/**
 * Get `Response` for mocking API requests in "full mocks" mode.
 * @internal
 */
export const getResponseFromFullMocks = (
  {fullMocksState, requestKind}: FullMocksRouteParams,
  request: Request,
): Response => {
  const {appliedMocks, testFullMocks} = fullMocksState;

  assertValueIsDefined(appliedMocks, 'appliedMocks is defined', {request, requestKind});

  const appliedCount = appliedMocks[requestKind] ?? 0;

  appliedMocks[requestKind] = appliedCount + 1;

  const {fullMocks: fullMocksConfig} = getFullPackConfig();

  assertValueIsNotNull(fullMocksConfig, 'fullMocksConfig is not null', {request, requestKind});

  const responseWithRequest = testFullMocks[requestKind]?.[appliedCount];

  const fullMocksResponse = fullMocksConfig.getResponseFromFullMocks({
    request,
    requestKind,
    responseWithRequest,
    testFullMocks,
  });

  const {responseBody} = fullMocksResponse;
  const responseBodyAsString = responseBody === undefined ? '' : JSON.stringify(responseBody);
  const contentJsonHeaders = getContentJsonHeaders(responseBodyAsString);

  const response: Response = {
    responseBody: undefined,
    ...fullMocksResponse,
    responseHeaders: {
      ...fullMocksResponse.responseHeaders,
      'content-encoding': 'identity',
      ...contentJsonHeaders,
    },
  };

  return response;
};

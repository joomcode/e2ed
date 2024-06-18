import {BAD_REQUEST_STATUS_CODE, MULTIPLE_CHOICES_STATUS_CODE} from '../../constants/internal';

import {getDurationWithUnits} from '../getDurationWithUnits';
import {parseMaybeEmptyValueAsJson} from '../parseMaybeEmptyValueAsJson';

import {getRequestFromPlaywrightRequest} from './getRequestFromPlaywrightRequest';

import type {Response as PlaywrightResponse} from '@playwright/test';

import type {ResponseWithRequest, StatusCode, UtcTimeInMs} from '../../types/internal';

/**
 * Get response object from the original Playwright response object.
 * If `isResponseBodyInJsonFormat` is `true`, then parses body as JSON.
 * If `isResponseBodyInJsonFormat` is `false`, then returns body as is.
 * If `isResponseBodyInJsonFormat` is `undefined`, then safely tries to parse body as JSON.
 * @internal
 */
export const getResponseFromPlaywrightResponse = async (
  playwrightResponse: PlaywrightResponse,
  isResponseBodyInJsonFormat?: boolean,
): Promise<ResponseWithRequest> => {
  const playwrightRequest = playwrightResponse.request();
  const request = getRequestFromPlaywrightRequest(playwrightRequest);

  let responseBody: unknown;

  const statusCode = playwrightResponse.status() as StatusCode;

  if (statusCode >= MULTIPLE_CHOICES_STATUS_CODE && statusCode < BAD_REQUEST_STATUS_CODE) {
    responseBody = '';
  } else if (isResponseBodyInJsonFormat === true) {
    responseBody = await playwrightResponse.json().catch(() => '');
  } else {
    const responseBodyAsString = await playwrightResponse.text().catch(() => '');

    try {
      responseBody = parseMaybeEmptyValueAsJson(responseBodyAsString);
    } catch {
      responseBody = responseBodyAsString;
    }
  }

  const completionTimeInMs = Date.now() as UtcTimeInMs;
  const duration = getDurationWithUnits(completionTimeInMs - request.utcTimeInMs);
  const responseHeaders = playwrightResponse.headers();

  return {completionTimeInMs, duration, request, responseBody, responseHeaders, statusCode};
};

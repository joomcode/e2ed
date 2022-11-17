// eslint-disable-next-line import/no-extraneous-dependencies, import/no-internal-modules
import {decodeContent} from 'testcafe-hammerhead/lib/processing/encoding';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-internal-modules
import Charset from 'testcafe-hammerhead/lib/processing/encoding/charset';

import {parseMaybeEmptyValueAsJson} from '../parseMaybeEmptyValueAsJson';

import type {RequestHookEncoding, RequestHookResponseEvent, Response} from '../../types/internal';

/**
 * Get Response object from the original TestCafe request context.
 * @internal
 */
export const getResponseFromResponseEvent = async ({
  body,
  headers = {},
  statusCode = 200,
}: RequestHookResponseEvent): Promise<Response> => {
  const charset = new Charset();
  const encoding = (headers['content-encoding'] ?? 'identity') as RequestHookEncoding;

  let responseBody: unknown;

  if (body) {
    const responseBodyAsString = await decodeContent(body, encoding, charset);

    try {
      responseBody = parseMaybeEmptyValueAsJson(responseBodyAsString);
    } catch {
      responseBody = responseBodyAsString;
    }
  }

  return {responseBody, responseHeaders: headers, statusCode};
};

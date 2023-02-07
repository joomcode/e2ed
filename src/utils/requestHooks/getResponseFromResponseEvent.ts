import {parseMaybeEmptyValueAsJson} from '../parseMaybeEmptyValueAsJson';

import {charsetPath, encodingPath} from './testCafeHammerheadPaths';

import type {RequestHookEncoding, RequestHookResponseEvent, Response} from '../../types/internal';

type CharsetType = typeof import('testcafe-hammerhead-up/lib/processing/encoding/charset').default;
type EncodingType = typeof import('testcafe-hammerhead-up/lib/processing/encoding');

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
const Charset = require<CharsetType>(charsetPath);
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
const {decodeContent} = require<EncodingType>(encodingPath);

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

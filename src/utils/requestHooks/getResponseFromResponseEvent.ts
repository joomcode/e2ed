import {parseMaybeEmptyValueAsJson} from '../parseMaybeEmptyValueAsJson';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {getHeaderValue} from './getHeaderValue';
import {charsetPath, encodingPath} from './testCafeHammerheadUpPaths';

import type {RequestHookEncoding, RequestHookResponseEvent, Response} from '../../types/internal';

type CharsetType = typeof import('testcafe-hammerhead-up/lib/processing/encoding/charset').default;
type EncodingType = typeof import('testcafe-hammerhead-up/lib/processing/encoding');

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
const Charset = require<CharsetType>(charsetPath);
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
const {decodeContent} = require<EncodingType>(encodingPath);

/**
 * Get response object from the original TestCafe request context.
 * @internal
 */
export const getResponseFromResponseEvent = async (
  {body, headers = {}, statusCode = 200}: RequestHookResponseEvent,
  isDecodingNeeded: boolean,
): Promise<Response> => {
  const charset = new Charset();

  setReadonlyProperty(charset, 'charset', 'utf-8');

  const encoding = (getHeaderValue(headers, 'content-encoding') ??
    'identity') as RequestHookEncoding;

  let responseBody: unknown;

  if (body) {
    let responseBodyAsString: string;

    if (isDecodingNeeded) {
      responseBodyAsString = await decodeContent(body, encoding, charset);
    } else {
      responseBodyAsString = String(body);
    }

    try {
      responseBody = parseMaybeEmptyValueAsJson(responseBodyAsString);
    } catch {
      responseBody = responseBodyAsString;
    }
  }

  return {responseBody, responseHeaders: headers, statusCode};
};

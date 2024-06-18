import {parseMaybeEmptyValueAsJson} from '../parseMaybeEmptyValueAsJson';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {getHeaderValue} from './getHeaderValue';

import type {RequestHookEncoding, RequestHookResponseEvent, Response} from '../../types/internal';

class Charset {}

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
      responseBodyAsString = String(body);
      // TODO: decodecontent correctly
      // responseBodyAsString = await decodeContent(body, encoding, charset);
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

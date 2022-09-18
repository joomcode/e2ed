// eslint-disable-next-line import/no-internal-modules
import {decodeContent} from 'testcafe-hammerhead/lib/processing/encoding';

import type {RequestHookRequestContext, Response} from '../../types/internal';

/**
 * Get Response object from the original TestCafe request context.
 * @internal
 */
export const getResponseFromRequestContext = async (
  requestContext: RequestHookRequestContext,
): Promise<Response> => {
  const {charset, encoding} = requestContext.contentInfo;
  const responseBodyAsString = await decodeContent(requestContext.destResBody, encoding, charset);
  let responseBody: unknown;

  try {
    responseBody = JSON.parse(responseBodyAsString);
  } catch {
    responseBody = responseBodyAsString;
  }

  const {headers = {}, statusCode = 200} = requestContext.destRes;

  return {responseBody, responseHeaders: headers, statusCode};
};

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
  const destResBody =
    // eslint-disable-next-line no-underscore-dangle
    requestContext.destResBody ?? (await requestContext._getDestResBody(requestContext.destRes));

  const {charset, encoding} = requestContext.contentInfo;
  let responseBody: unknown;

  if (destResBody) {
    const responseBodyAsString = await decodeContent(destResBody, encoding, charset);

    try {
      responseBody = JSON.parse(responseBodyAsString);
    } catch {
      responseBody = responseBodyAsString;
    }
  }

  const {headers = {}, statusCode = 200} = requestContext.destRes;

  return {responseBody, responseHeaders: headers, statusCode};
};

import {Route} from './Route';

import type {
  Method,
  Request,
  REQUEST_KEY_TYPE,
  Response,
  RESPONSE_KEY_TYPE,
  Url,
} from './types/internal';

/**
 * Inner key for request type.
 */
declare const REQUEST_KEY: REQUEST_KEY_TYPE;

/**
 * Inner key for response type.
 */
declare const RESPONSE_KEY: RESPONSE_KEY_TYPE;

/**
 * Abstract route for API requests.
 */
export abstract class ApiRoute<
  Params = undefined,
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> extends Route<Params> {
  /**
   * Get HTTP method of API route.
   */
  abstract getMethod(): Method;

  /**
   * Request type of API route.
   */
  declare readonly [REQUEST_KEY]: SomeRequest;

  /**
   * Response type of API route.
   */
  declare readonly [RESPONSE_KEY]: SomeResponse;

  /**
   * Return true, if the request body is in JSON format.
   */
  getIsRequestBodyInJsonFormat(): boolean {
    return true;
  }

  /**
   * Return true, if the response body is in JSON format.
   */
  getIsResponseBodyInJsonFormat(): boolean {
    return true;
  }

  getOrigin(): Url {
    return 'http://localhost' as Url;
  }
}

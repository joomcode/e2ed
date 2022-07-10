import {Route} from './Route';

import type {
  Method,
  Request,
  REQUEST_KEY_TYPE,
  Response,
  RESPONSE_KEY_TYPE,
  Url,
} from './types/internal';

declare const REQUEST_KEY: REQUEST_KEY_TYPE;
declare const RESPONSE_KEY: RESPONSE_KEY_TYPE;

/**
 * Abstract route for API requests.
 */
export abstract class ApiRoute<
  Params = undefined,
  SomeRequest = Request,
  SomeResponse = Response,
> extends Route<Params> {
  abstract getMethod(): Method;

  declare readonly [REQUEST_KEY]: SomeRequest;

  declare readonly [RESPONSE_KEY]: SomeResponse;

  getOrigin(): Url {
    return 'http://localhost' as Url;
  }
}

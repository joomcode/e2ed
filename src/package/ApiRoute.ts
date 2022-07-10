import {Route} from './Route';

import type {Method, REQUEST, Request, RESPONSE, Response, Url} from './types/internal';

declare const REQUEST_KEY: REQUEST;
declare const RESPONSE_KEY: RESPONSE;

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

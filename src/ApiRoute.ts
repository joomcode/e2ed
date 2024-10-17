import {Route} from './Route';

import type {Method, Request, Response, Url} from './types/internal';

/**
 * Abstract route for API requests.
 */
export abstract class ApiRoute<
  Params = undefined,
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> extends Route<Params> {
  /**
   * Request type of API route.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare readonly __REQUEST_KEY: SomeRequest;

  /**
   * Response type of API route.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare readonly __RESPONSE_KEY: SomeResponse;

  /**
   * Returns `true`, if the request body is in JSON format.
   */
  getIsRequestBodyInJsonFormat(): boolean {
    return true;
  }

  /**
   * Returns `true`, if the response body is in JSON format.
   */
  getIsResponseBodyInJsonFormat(): boolean {
    return true;
  }

  getOrigin(): Url {
    return 'http://localhost' as Url;
  }

  /**
   * Get HTTP method of API route.
   */
  abstract getMethod(): Method;
}

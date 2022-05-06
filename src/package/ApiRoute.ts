import {Route} from './Route';

import type {Method, Url} from './types/internal';

/**
 * Abstract route for API requests.
 */
export abstract class ApiRoute<Params> extends Route<Params> {
  /**
   * Return the http-method of the route (for API requests).
   */
  abstract getMethod(): Method;

  getOrigin(): Url {
    return (process.env.E2ED_API_ORIGIN || 'http://localhost') as Url;
  }
}

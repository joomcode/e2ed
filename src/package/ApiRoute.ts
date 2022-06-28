import {Route} from './Route';

import type {Method, Url} from './types/internal';

/**
 * Abstract route for API requests.
 */
export abstract class ApiRoute<Params = undefined> extends Route<Params> {
  abstract getMethod(): Method;

  getOrigin(): Url {
    return 'http://localhost' as Url;
  }
}

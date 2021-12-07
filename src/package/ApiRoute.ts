import {Route} from './Route';

import type {Url} from './types/internal';

/**
 * Abstract route for API requests.
 */
export abstract class ApiRoute<Params = unknown> extends Route<Params> {
  getOrigin(): Url {
    return (process.env.E2ED_API_ORIGIN || 'http://localhost') as Url;
  }
}

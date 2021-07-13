import {Route} from './Route';

/**
 * Abstract route for API requests.
 */
export abstract class ApiRoute<Params = unknown> extends Route<Params> {
  getOrigin(): string {
    return process.env.E2ED_API_ORIGIN || 'http://localhost';
  }
}

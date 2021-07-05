import {STAGE_CLIENT_API} from 'e2e/constants';

import {Route} from '../Route';

/**
 * Abstract route for API requests.
 */
export abstract class ApiRoute<Params = unknown> extends Route<Params> {
  getOrigin(): string {
    return process.env.E2E_CLIENT_API || STAGE_CLIENT_API;
  }
}

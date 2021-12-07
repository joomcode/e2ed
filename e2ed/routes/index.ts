import {ApiRoute as BaseApiRoute} from 'e2ed';

import type {Url} from 'e2ed/types';

/**
 * Abstract custom route for API requests.
 */
export abstract class ApiRoute<Params = unknown> extends BaseApiRoute<Params> {
  override getOrigin(): Url {
    return (process.env.E2ED_API_ORIGIN || 'http://localhost:3000') as Url;
  }
}

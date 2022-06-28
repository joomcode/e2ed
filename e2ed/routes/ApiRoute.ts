import {ApiRoute as BaseApiRoute} from 'e2ed';

import type {Url} from 'e2ed/types';

/**
 * Abstract custom route for API requests.
 */
export abstract class ApiRoute<Params = undefined> extends BaseApiRoute<Params> {
  override getOrigin(): Url {
    return 'http://localhost:3000' as Url;
  }
}

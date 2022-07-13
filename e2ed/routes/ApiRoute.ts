import {ApiRoute as BaseApiRoute} from 'e2ed';

import type {Request, Response, Url} from 'e2ed/types';

/**
 * Abstract custom route for API requests.
 */
export abstract class ApiRoute<
  Params = undefined,
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> extends BaseApiRoute<Params, SomeRequest, SomeResponse> {
  override getOrigin(): Url {
    return 'http://localhost:3000' as Url;
  }
}

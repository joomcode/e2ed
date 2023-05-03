import {ApiRoute} from 'autotests/routes';

import type {ApiGetUsersRequest, ApiGetUsersResponse} from 'autotests/types';
import type {Url} from 'e2ed/types';

/**
 * Client API route for getting users list.
 */
export class GetUsers extends ApiRoute<undefined, ApiGetUsersRequest, ApiGetUsersResponse> {
  getMethod(): 'GET' {
    return 'GET';
  }

  override getOrigin(): Url {
    return 'https://reqres.in' as Url;
  }

  getPath(): string {
    return '/api/users?delay=3';
  }
}

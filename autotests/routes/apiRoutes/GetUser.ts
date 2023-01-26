import {ApiRoute} from 'autotests/routes';

import type {ApiGetUserRequest, ApiGetUserResponse, UserId} from 'autotests/types';

type Params = Readonly<{userId: UserId}>;

/**
 * Client API route for getting user.
 */
export class GetUser extends ApiRoute<Params, ApiGetUserRequest, ApiGetUserResponse> {
  getMethod(): 'GET' {
    return 'GET';
  }

  getPath(): string {
    const {userId} = this.routeParams;

    return `/user/${userId}`;
  }
}

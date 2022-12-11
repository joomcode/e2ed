import {ApiRoute} from 'autotests/routes';

import type {ApiUserRequest, ApiUserResponse} from 'autotests/types';

/**
 * Client API route for user signUp.
 */
export class UserSignUp extends ApiRoute<undefined, ApiUserRequest, ApiUserResponse> {
  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    return '/user/auth/signUp';
  }
}

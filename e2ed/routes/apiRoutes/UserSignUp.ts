import {ApiRoute} from 'e2ed/routes';

import type {ApiUserRequest, ApiUserResponse} from 'e2ed/types';

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

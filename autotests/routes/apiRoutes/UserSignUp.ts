import {ApiRoute} from 'autotests/routes';

import type {ApiUserSignUpRequest, ApiUserSignUpResponse} from 'autotests/types';

/**
 * Client API route for user signUp.
 */
export class UserSignUp extends ApiRoute<undefined, ApiUserSignUpRequest, ApiUserSignUpResponse> {
  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    return '/user/auth/signUp';
  }
}

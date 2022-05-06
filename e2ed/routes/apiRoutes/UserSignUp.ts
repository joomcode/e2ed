import {ApiRoute} from 'e2ed/routes';

/**
 * Client API route for user signUp.
 */
export class UserSignUp extends ApiRoute {
  // eslint-disable-next-line class-methods-use-this
  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    return '/user/auth/signUp';
  }
}

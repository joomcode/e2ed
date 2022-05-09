import {ApiRoute} from 'e2ed/routes';

/**
 * Client API route for user signUp.
 */
export class UserSignUp extends ApiRoute {
  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    return '/user/auth/signUp';
  }
}

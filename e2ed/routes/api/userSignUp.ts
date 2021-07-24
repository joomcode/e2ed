import {ApiRoute} from 'e2ed';

/**
 * Client API route for user signUp.
 */
class UserSignUp extends ApiRoute {
  getMethod(): 'POST' {
    return 'POST';
  }

  // eslint-disable-next-line class-methods-use-this
  getPath(): string {
    return '/user/auth/signUp';
  }
}

export const userSignUp = new UserSignUp();

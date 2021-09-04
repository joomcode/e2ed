import {ApiRoute} from 'e2ed/routes';

/**
 * Client API route for user signUp.
 */
class UserSignUp extends ApiRoute {
  override getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    return '/user/auth/signUp';
  }
}

export const userSignUp = new UserSignUp();

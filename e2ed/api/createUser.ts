import {DEFAULT_PASSWORD} from 'e2e/constants';
import {apiRoutes} from 'e2e/routes';
import type {Password, User, UserInfo} from 'e2e/types';
import {request} from 'e2e/utils';

type Input = Readonly<UserInfo & {password: Password}>;

type Output = Readonly<{
  payload: User;
}>;

/**
 * Create new user.
 */
export const createUser = async (userInfo: UserInfo): Promise<User> => {
  const url = apiRoutes.userSignUp.getUrl();
  const input = {...userInfo, password: DEFAULT_PASSWORD};

  const {
    output: {payload: User},
  } = await request<Input, Output>({
    url,
    method: apiRoutes.userSignUp.getMethod(),
    input,
  });

  return User;
};

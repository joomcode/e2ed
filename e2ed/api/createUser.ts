import {DEFAULT_PASSWORD} from 'e2ed/constants';
import {apiRoutes} from 'e2ed/routes';
import {request} from 'e2ed/utils';

import type {DeepReadonly, Password, User, UserInfo} from 'e2ed/types';

type Input = DeepReadonly<UserInfo & {password: Password}>;

type Output = DeepReadonly<{
  payload: User;
}>;

/**
 * Create new user.
 */
export const createUser = async (userInfo: UserInfo): Promise<User> => {
  const url = apiRoutes.userSignUp.getUrl();
  const input = {...userInfo, password: DEFAULT_PASSWORD};

  const {
    output: {payload: user},
  } = await request<Input, Output>({
    url,
    method: apiRoutes.userSignUp.getMethod(),
    input,
  });

  return user;
};

import {UserSignUp} from 'e2ed/routes/apiRoutes';
import {request} from 'e2ed/utils';

import type {ApiUser, ApiUserParams, User} from 'e2ed/types';

type Input = ApiUserParams;

type Output = Readonly<{
  payload: ApiUser;
}>;

const userSignUpRoute = new UserSignUp();

/**
 * Create new user by API request.
 */
export const createUser = async (params: ApiUserParams): Promise<User> => {
  const url = userSignUpRoute.getUrl();

  const {
    output: {payload: apiUser},
  } = await request<Input, Output>({
    input: params,
    method: userSignUpRoute.getMethod(),
    url,
  });

  return {...apiUser, password: params.password};
};

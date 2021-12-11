import {apiRoutes} from 'e2ed/routes';
import {request} from 'e2ed/utils';

import type {ApiUser, ApiUserParams, User} from 'e2ed/types';

type Input = ApiUserParams;

type Output = Readonly<{
  payload: ApiUser;
}>;

/**
 * Create new user by API request.
 */
export const createUser = async (params: ApiUserParams): Promise<User> => {
  const url = apiRoutes.userSignUp.getUrl();

  const {
    output: {payload: apiUser},
  } = await request<Input, Output>({
    url,
    method: apiRoutes.userSignUp.getMethod(),
    input: params,
  });

  return {...apiUser, password: params.password};
};

import {UserSignUp} from 'e2ed/routes/apiRoutes';
import {request} from 'e2ed/utils';

import type {ApiUser, ApiUserParams, User} from 'e2ed/types';

type RequestBody = ApiUserParams;

type ResponseBody = Readonly<{
  payload: ApiUser;
}>;

const userSignUpRoute = new UserSignUp();

/**
 * Create new user by API request.
 */
export const createUser = async (params: ApiUserParams): Promise<User> => {
  const url = userSignUpRoute.getUrl();

  const {
    responseBody: {payload: apiUser},
  } = await request<RequestBody, ResponseBody>({
    method: userSignUpRoute.getMethod(),
    requestBody: params,
    url,
  });

  return {...apiUser, password: params.password};
};

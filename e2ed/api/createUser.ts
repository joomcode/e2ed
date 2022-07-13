import {UserSignUp} from 'e2ed/routes/apiRoutes';
import {request} from 'e2ed/utils';

import type {ApiUserParams, User} from 'e2ed/types';

/**
 * Create new user by API request.
 */
export const createUser = async (params: ApiUserParams): Promise<User> => {
  const {
    responseBody: {payload: apiUser},
  } = await request(UserSignUp, {requestBody: params});

  return {...apiUser, password: params.password};
};

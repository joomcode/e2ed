import {createUser as apiCreateUser} from 'e2ed/api';
import {DEFAULT_PASSWORD} from 'e2ed/constants';
import {getUserEmail, log} from 'e2ed/utils';

import type {User, UserParams} from 'e2ed/types';

/**
 * Create new user.
 */
export const createUser = async ({
  name = 'John Doe',
  email = getUserEmail(),
  password = DEFAULT_PASSWORD,
}: UserParams = {}): Promise<User> => {
  const user = await apiCreateUser({
    name,
    email,
    password,
  });

  await log('New user have been created', {user}, 'entity');

  return user;
};

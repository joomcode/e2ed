import {createUser as apiCreateUser} from 'e2ed/api';
import {DEFAULT_PASSWORD, LogEventType} from 'e2ed/constants';
import {getUserEmail, log} from 'e2ed/utils';

import type {User, UserParams} from 'e2ed/types';

/**
 * Create new user.
 */
export const createUser = async ({
  email = getUserEmail(),
  name = 'John Doe',
  password = DEFAULT_PASSWORD,
}: UserParams = {}): Promise<User> => {
  const user = await apiCreateUser({
    email,
    name,
    password,
  });

  await log('New user have been created', {user}, LogEventType.Entity);

  return user;
};

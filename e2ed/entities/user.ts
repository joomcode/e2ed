import {createUser as apiCreateUser} from 'e2ed/api';
import {DEFAULT_PASSWORD, LogEventType} from 'e2ed/constants';
import {createDevice} from 'e2ed/entities';
import {getUserEmail, log} from 'e2ed/utils';

import type {User, UserParams} from 'e2ed/types';

/**
 * Create new user.
 */
export const createUser = async ({
  device,
  email = getUserEmail(),
  name = 'John Doe',
  password = DEFAULT_PASSWORD,
}: UserParams = {}): Promise<User> => {
  const user = await apiCreateUser({
    device: device ?? (await createDevice()),
    email,
    name,
    password,
  });

  await log('New user have been created', {user}, LogEventType.Entity);

  return user;
};

import {createUser as apiCreateUser} from 'autotests/api';
import {DEFAULT_PASSWORD} from 'autotests/constants';
import {createDevice} from 'autotests/entities';
import {getNewUserEmail} from 'autotests/generators';
import {LogEventType} from 'e2ed/constants';
import {log} from 'e2ed/utils';

import type {User, UserParams} from 'autotests/types';

/**
 * Create new user.
 */
export const createUser = async ({
  device,
  email = getNewUserEmail(),
  name = 'John Doe',
  password = DEFAULT_PASSWORD,
}: UserParams = {}): Promise<User> => {
  const user = await apiCreateUser({
    device: device ?? (await createDevice()),
    email,
    name,
    password,
  });

  log('New user have been created', {user}, LogEventType.Entity);

  return user;
};

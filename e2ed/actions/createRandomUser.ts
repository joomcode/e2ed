import {createUser} from 'e2ed/api';
import {getUserEmail, log} from 'e2ed/utils';

import type {User, UserInfo} from 'e2ed/types';

/**
 * Create random user.
 */
export const createDeviceAndUser = async (
  {name = 'John Doe', email = getUserEmail()}: UserInfo = {} as UserInfo,
): Promise<User> => {
  const user = await createUser({
    name,
    email,
  });

  await log('Random user have been created', {user}, 'action');

  return user;
};

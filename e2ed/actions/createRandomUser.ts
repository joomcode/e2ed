import {createUser} from 'e2ed/entities';
import {getRandomUserName, log} from 'e2ed/utils';

import type {User} from 'e2ed/types';

/**
 * Create new user with random name.
 */
export const createRandomUser = async (): Promise<User> => {
  const name = getRandomUserName();
  const user = await createUser({name});

  await log(`User with random name "${name}" have been created`, {user}, 'action');

  return user;
};

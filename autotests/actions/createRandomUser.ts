import {createUser} from 'autotests/entities';
import {getRandomUserName} from 'autotests/generators';
import {LogEventType} from 'e2ed/constants';
import {log} from 'e2ed/utils';

import type {User} from 'autotests/types';

/**
 * Creates new user with random name.
 */
export const createRandomUser = async (): Promise<User> => {
  const name = getRandomUserName();
  const user = await createUser({name});

  log(`User with random name "${name}" have been created`, {user}, LogEventType.Action);

  return user;
};

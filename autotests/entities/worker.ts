import {createClientFunction} from 'e2ed';
import {log} from 'e2ed/utils';

import type {UserWorker} from 'autotests/types';
import type {ClientFunction} from 'e2ed/types';

const clientGetUsers = createClientFunction(
  (delay: number) =>
    fetch(`https://reqres.in/api/users?delay=${delay}`, {method: 'GET'}).then((res) => res.json()),
  {name: 'getUsers', timeout: 6_000},
);

/**
 * Adds user-worker.
 */
export const addUser: ClientFunction<[UserWorker, number?], Promise<object>> = createClientFunction(
  (user: UserWorker, delay?: number) =>
    fetch(`https://reqres.in/api/users${delay !== undefined ? `?delay=${delay}` : ''}`, {
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      method: 'POST',
    }),
  {name: 'addUser', timeout: 3_000},
);

/**
 * Get list of user-workers.
 */
export const getUsers = (delay: number = 0): Promise<unknown> => {
  log(`Send API request with delay = ${delay}s`);

  return clientGetUsers(delay);
};

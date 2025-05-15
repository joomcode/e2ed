import {createClientFunction} from 'e2ed';
import {log} from 'e2ed/utils';

import type {UserWorker} from 'autotests/types';
import type {ClientFunction} from 'e2ed/types';

type GetUsersOptions = Readonly<{delay?: number; retries?: number}> | undefined;

let clientGetUsers: ClientFunction<[number], unknown> | undefined;
let clientGetUsersRetries: number | undefined;

/**
 * Adds user-worker.
 */
export const addUser: ClientFunction<[UserWorker, number?], Promise<object>> = createClientFunction(
  (user: UserWorker, delay?: number) =>
    fetch(`https://reqres.in/api/users${delay !== undefined ? `?delay=${delay}` : ''}`, {
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        ...(delay !== undefined && delay > 0 ? {'x-api-key': 'reqres-free-v1'} : undefined),
      },
      method: 'POST',
    }),
  {name: 'addUser', timeout: 3_000},
);

/**
 * Get list of user-workers.
 */
export const getUsers = ({delay = 0, retries = 0}: GetUsersOptions = {}): Promise<unknown> => {
  log(`Send API request with delay = ${delay}s`);

  if (clientGetUsers === undefined || clientGetUsersRetries !== retries) {
    clientGetUsersRetries = retries;

    clientGetUsers = createClientFunction(
      (clientDelay: number) =>
        fetch(`https://reqres.in/api/users?delay=${clientDelay}`, {method: 'GET'}).then(
          (res) => res.json() as unknown,
        ),
      {name: 'getUsers', retries, timeout: 6_000},
    );
  }

  return clientGetUsers(delay);
};

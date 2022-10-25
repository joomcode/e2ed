import {createClientFunction, expect, it} from 'e2ed';
import {waitForResponse} from 'e2ed/actions';

import type {Response} from 'e2ed/types';

type Body = Readonly<{job: string; name: string}> | undefined;

it(
  'waitForResponse get correct response body',
  {meta: {testId: '3'}, testIdleTimeout: 3_000},
  async () => {
    const addUser = createClientFunction(
      () =>
        Promise.race([
          fetch('https://reqres.in/api/users', {
            body: JSON.stringify({job: 'leader', name: 'John'}),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            method: 'POST',
          }).then((res) => res.json()),
          new Promise<void>((resolve) => {
            setTimeout(resolve, 2_000);
          }),
        ]),
      'addUser',
    );

    void addUser();

    const response = await waitForResponse(
      ({responseBody}: Response<Body>) => responseBody?.name === 'John',
    );

    await expect(response.responseBody, 'response has correct body').contains({
      job: 'leader',
      name: 'John',
    });
  },
);

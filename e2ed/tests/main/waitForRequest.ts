import {createClientFunction, expect, it} from 'e2ed';
import {waitForRequest} from 'e2ed/actions';

import type {Request} from 'e2ed/types';

type Body = Readonly<{job: string; name: string}> | undefined;

it(
  'waitForRequest get correct request body',
  {meta: {testId: '2'}, testIdleTimeout: 3_000},
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

    const request = await waitForRequest(
      ({requestBody}: Request<Body>) => requestBody?.name === 'John',
    );

    await expect(request.requestBody, 'request has correct body').eql({
      job: 'leader',
      name: 'John',
    });
  },
);

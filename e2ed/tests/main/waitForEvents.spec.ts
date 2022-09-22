import {ClientFunction, expect, it} from 'e2ed';
import {waitForRequest, waitForResponse} from 'e2ed/actions';

import type {Request, Response} from 'e2ed/types';

type Body = Readonly<{job: string; name: string}> | undefined;

it(
  'waitForRequest/waitForResponse get correct request/response bodies',
  {meta: {testId: '2'}, testIdleTimeout: 3_000},
  async () => {
    const addUser = ClientFunction(
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

    const [request, response] = await Promise.all([
      waitForRequest(({requestBody}: Request<Body>) => requestBody?.name === 'John'),
      waitForResponse(({responseBody}: Response<Body>) => responseBody?.name === 'John'),
    ]);

    await expect(request.requestBody, 'request has correct body').eql({
      job: 'leader',
      name: 'John',
    });

    await expect(response.responseBody, 'response has correct body').contains({
      job: 'leader',
      name: 'John',
    });
  },
);

import {it} from 'autotests';
import {createClientFunction, expect} from 'e2ed';
import {waitForRequest} from 'e2ed/actions';
import {E2edError} from 'e2ed/utils';

import type {Request} from 'e2ed/types';

type Body = Readonly<{job: string; name: string}> | undefined;

it(
  'waitForRequest gets correct request body and rejects on timeout',
  {meta: {testId: '2'}, testIdleTimeout: 3_000},
  async () => {
    const addUser = createClientFunction(
      () =>
        fetch('https://reqres.in/api/users', {
          body: JSON.stringify({job: 'leader', name: 'John'}),
          headers: {'Content-Type': 'application/json; charset=UTF-8'},
          method: 'POST',
        }).then((res) => res.json()),
      {name: 'addUser', timeout: 2_000},
    );

    void addUser();

    const request = await waitForRequest(
      ({requestBody}: Request<Body>) => requestBody?.name === 'John',
    );

    await expect(request.requestBody, 'request has correct body').eql({
      job: 'leader',
      name: 'John',
    });

    await waitForRequest(() => false, {timeout: 100}).then(
      () => {
        throw new E2edError('waitForRequest did not throw an error after timeout');
      },
      () => undefined,
    );
  },
);

import {it} from 'autotests';
import {GetUsers} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {assertFunctionThrows, request} from 'e2ed/utils';

it(
  'send correct requests and rejects on timeout',
  {meta: {testId: '7'}, testIdleTimeout: 6_000},
  async () => {
    const {
      responseBody: {data},
    } = await request(GetUsers);

    await expect(data.length, 'request returns some users').gt(0);

    await assertFunctionThrows(async () => {
      await request(GetUsers, {maxRetriesCount: 1, timeout: 2_000});
    }, '`request` function throws an error on timeout');
  },
);

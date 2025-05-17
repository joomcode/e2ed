import {test} from 'autotests';
import {GetUsers} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {assertFunctionThrows, request} from 'e2ed/utils';

test(
  'send correct requests and rejects on timeout',
  {meta: {testId: '7'}, testIdleTimeout: 6_000},
  async () => {
    const {
      responseBody: {users},
    } = await request(GetUsers, {
      routeParams: {delay: 3_000},
    });

    await expect(users.length, 'request returns some users').gt(0);

    await assertFunctionThrows(async () => {
      await request(GetUsers, {maxRetriesCount: 1, routeParams: {delay: 3_000}, timeout: 2_000});
    }, 'request function throws an error on timeout');
  },
);

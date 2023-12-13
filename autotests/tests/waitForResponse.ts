import {test} from 'autotests';
import {addUser} from 'autotests/entities';
import {AddUser} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {waitForResponse, waitForResponseToRoute} from 'e2ed/actions';
import {assertFunctionThrows} from 'e2ed/utils';

import type {ApiAddUserRequest, ApiAddUserResponse, UserWorker} from 'autotests/types';

const worker: UserWorker = {job: 'leader', name: 'John'};

test(
  'waitForResponse/waitForResponseToRoute gets correct response body and rejects on timeout',
  {meta: {testId: '3'}, testIdleTimeout: 3_000},
  async () => {
    void addUser(worker);

    let response = await waitForResponse<ApiAddUserResponse, ApiAddUserRequest>(
      ({responseBody}) => responseBody.name === 'John',
    );

    await expect(response.responseBody, 'response has correct body').contains(worker);

    await assertFunctionThrows(async () => {
      await waitForResponse(() => false, {timeout: 100});
    }, 'waitForResponse throws an error on timeout');

    void addUser(worker);

    response = await waitForResponse<ApiAddUserResponse, ApiAddUserRequest>(
      ({request}) => request.url === 'https://reqres.in/api/users',
    );

    await expect(response.responseBody, 'second response has correct body').contains(worker);

    void addUser(worker);

    await assertFunctionThrows(async () => {
      await waitForResponse(() => {
        throw new Error('foo');
      }).catch((error: Error & {cause?: {message?: string}}) => {
        if (error.cause?.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForResponse throws an error from predicate');

    void addUser(worker, 1);

    let {response: routeResponse, routeParams} = await waitForResponseToRoute(AddUser);

    await expect(
      routeResponse.request.requestBody,
      'request from waitForResponseToRoute has correct body',
    ).eql(worker);

    await expect(routeParams, 'routeParams from waitForResponseToRoute is correct').eql({delay: 1});

    void addUser(worker, 1);

    ({response: routeResponse, routeParams} = await waitForResponseToRoute(
      AddUser,
      ({delay}, {request, responseBody}) =>
        delay === 1 && request.requestBody.job === worker.job && responseBody.name === worker.name,
    ));

    await expect(
      routeParams,
      'routeParams from waitForRequestToRoute with predicate is correct',
    ).eql({delay: 1});

    void addUser(worker);

    await assertFunctionThrows(async () => {
      await waitForResponseToRoute(AddUser, ({delay}) => delay === 1, {timeout: 2_000});
    }, 'waitForResponseToRoute throws an error on timeout');

    void addUser(worker);

    await assertFunctionThrows(async () => {
      await waitForResponseToRoute(AddUser, () => {
        throw new Error('foo');
      }).catch((error: Error & {cause?: {message?: string}}) => {
        if (error.cause?.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForResponseToRoute throws an error from predicate');
  },
);

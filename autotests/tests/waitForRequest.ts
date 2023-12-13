import {test} from 'autotests';
import {addUser} from 'autotests/entities';
import {AddUser} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {waitForRequest, waitForRequestToRoute} from 'e2ed/actions';
import {assertFunctionThrows} from 'e2ed/utils';

import type {ApiAddUserRequest, UserWorker} from 'autotests/types';

const worker: UserWorker = {job: 'leader', name: 'John'};

test(
  'waitForRequest/waitForRequestToRoute gets correct request body and rejects on timeout',
  {meta: {testId: '2'}, testIdleTimeout: 3_000},
  async () => {
    void addUser(worker);

    const request = await waitForRequest(
      ({requestBody}: ApiAddUserRequest) => requestBody.name === 'John',
    );

    await expect(request.requestBody, 'request has correct body').eql(worker);

    await assertFunctionThrows(async () => {
      await waitForRequest(() => false, {timeout: 100});
    }, 'waitForRequest throws an error on timeout');

    void addUser(worker);

    await assertFunctionThrows(async () => {
      await waitForRequest(() => {
        throw new Error('foo');
      }).catch((error: Error & {cause?: {message?: string}}) => {
        if (error.cause?.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForRequest throws an error from predicate');

    void addUser(worker, 1);

    let {request: routeRequest, routeParams} = await waitForRequestToRoute(AddUser);

    await expect(
      routeRequest.requestBody,
      'request from waitForRequestToRoute has correct body',
    ).eql(worker);

    await expect(routeParams, 'routeParams from waitForRequestToRoute is correct').eql({delay: 1});

    void addUser(worker, 1);

    ({request: routeRequest, routeParams} = await waitForRequestToRoute(
      AddUser,
      ({delay}, {requestBody, url}) =>
        delay === 1 && url.endsWith('delay=1') && requestBody.name === worker.name,
    ));

    await expect(
      routeParams,
      'routeParams from waitForRequestToRoute with predicate is correct',
    ).eql({delay: 1});

    void addUser(worker);

    await assertFunctionThrows(async () => {
      await waitForRequestToRoute(AddUser, ({delay}) => delay === 1, {timeout: 2_000});
    }, 'waitForRequestToRoute throws an error on timeout');

    void addUser(worker);

    await assertFunctionThrows(async () => {
      await waitForRequestToRoute(AddUser, () => {
        throw new Error('foo');
      }).catch((error: Error & {cause?: {message?: string}}) => {
        if (error.cause?.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForRequestToRoute throws an error from predicate');
  },
);

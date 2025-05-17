/* eslint-disable max-lines */

import {test} from 'autotests';
import {getPageCookies} from 'autotests/context';
import {addUser} from 'autotests/entities';
import {AddUser} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {waitForRequest, waitForRequestToRoute} from 'e2ed/actions';
import {assertFunctionThrows} from 'e2ed/utils';

import type {ApiAddUserRequest, UserWorker} from 'autotests/types';

const worker: UserWorker = {firstName: 'John', lastName: 'Doe'};

test(
  'waitForRequest/waitForRequestToRoute gets correct request body and rejects on timeout',
  {meta: {testId: '2'}, testIdleTimeout: 3_000},
  // eslint-disable-next-line max-lines-per-function
  async () => {
    const request = await waitForRequest(
      ({requestBody}: ApiAddUserRequest) => {
        getPageCookies();

        return requestBody.firstName === worker.firstName;
      },
      async () => {
        getPageCookies();

        await addUser({user: worker});
      },
    );

    await expect(request.requestBody, 'request has correct body').eql(worker);

    await assertFunctionThrows(async () => {
      await waitForRequest(() => false, {timeout: 100});
    }, 'waitForRequest throws an error on timeout');

    await assertFunctionThrows(async () => {
      await waitForRequest(
        () => {
          throw new Error('foo');
        },
        () => {
          void addUser({user: worker});
        },
      ).catch((error: Error) => {
        if (error.cause instanceof Error && error.cause.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForRequest throws an error from predicate');

    await assertFunctionThrows(async () => {
      await waitForRequest(
        () => true,
        () => {
          throw new Error('foo');
        },
      ).catch((error: unknown) => {
        if (error instanceof Error && error.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForRequest throws an error from trigger');

    let {request: routeRequest, routeParams} = await waitForRequestToRoute(AddUser, async () => {
      await addUser({delay: 1_000, user: worker});
    });

    await expect(
      routeRequest.requestBody,
      'request from waitForRequestToRoute has correct body',
    ).eql(worker);

    await expect(routeParams, 'routeParams from waitForRequestToRoute is correct').eql({
      delay: 1_000,
    });

    ({request: routeRequest, routeParams} = await waitForRequestToRoute(
      AddUser,
      async () => {
        await addUser({delay: 1_000, user: worker});
      },
      {
        predicate: ({delay}, {requestBody, url}) =>
          delay === 1_000 &&
          url.endsWith('delay=1000') &&
          requestBody.firstName === worker.firstName,
      },
    ));

    await expect(
      routeParams,
      'routeParams from waitForRequestToRoute with predicate is correct',
    ).eql({delay: 1_000});

    await assertFunctionThrows(async () => {
      await waitForRequestToRoute(
        AddUser,
        async () => {
          await addUser({user: worker});
        },
        {predicate: ({delay}) => delay === 1_000, timeout: 2_000},
      );
    }, 'waitForRequestToRoute throws an error on timeout');

    void addUser({user: worker});

    await assertFunctionThrows(async () => {
      await waitForRequestToRoute(AddUser, {
        predicate: () => {
          throw new Error('foo');
        },
      }).catch((error: Error) => {
        if (error.cause instanceof Error && error.cause.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForRequestToRoute throws an error from predicate');

    await assertFunctionThrows(async () => {
      await waitForRequestToRoute(AddUser, async () => {
        await Promise.resolve();

        throw new Error('foo');
      }).catch((error: unknown) => {
        if (error instanceof Error && error.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForRequestToRoute throws an error from trigger');

    await assertFunctionThrows(async () => {
      await waitForRequestToRoute(
        AddUser,
        async () => {
          await addUser({user: worker});
        },
        {
          predicate: () => {
            throw new Error('foo');
          },
        },
      ).catch((error: Error) => {
        if (error.cause instanceof Error && error.cause.message === 'foo') {
          throw error;
        }
      });
    }, 'waitForRequestToRoute throws an error from predicate with trigger');
  },
);

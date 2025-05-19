/* eslint-disable @typescript-eslint/no-magic-numbers */

import {test} from 'autotests';
import {getUsers} from 'autotests/entities';
import {waitForAllRequestsComplete, waitForTimeout} from 'e2ed/actions';
import {assertFunctionThrows, E2edError} from 'e2ed/utils';

test(
  'waitForAllRequestsComplete works correct with timeout and predicate in base cases',
  {meta: {testId: '9'}, testIdleTimeout: 6_000},
  // eslint-disable-next-line complexity, max-statements
  async () => {
    let startRequestInMs = Date.now();

    await waitForAllRequestsComplete(() => true, {maxIntervalBetweenRequestsInMs: 300});

    let waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 250 || waitedInMs > 450) {
      throw new E2edError(
        'waitForAllRequestsComplete did not wait for maxIntervalBetweenRequestsInMs in the beginning',
        {waitedInMs},
      );
    }

    await assertFunctionThrows(async () => {
      await waitForAllRequestsComplete(() => true, {timeout: 100});
    }, 'Catch error from waitForAllRequestsComplete for {timeout: 100}');

    await waitForAllRequestsComplete(() => true, {timeout: 1000});

    startRequestInMs = Date.now();

    let promise = waitForAllRequestsComplete(() => true, {timeout: 1000});

    void getUsers({delay: 2_000});

    await assertFunctionThrows(
      () => promise,
      'Catch error from waitForAllRequestsComplete for {timeout: 1000}',
    );

    waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 1000 || waitedInMs > 1100) {
      throw new E2edError('waitForAllRequestsComplete did not wait for timeout', {waitedInMs});
    }

    void getUsers({delay: 2_000});

    startRequestInMs = Date.now();

    await waitForAllRequestsComplete(
      ({url}) => !url.includes('https://dummyjson.com/users?delay='),
      {timeout: 1000},
    );

    waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 500 || waitedInMs > 600) {
      throw new E2edError(
        'waitForAllRequestsComplete did not wait for maxIntervalBetweenRequestsInMs with filtered request',
        {waitedInMs},
      );
    }

    promise = waitForAllRequestsComplete(() => true);

    await getUsers({delay: 1_000});
    await waitForTimeout(400);
    await getUsers({delay: 1_000});

    startRequestInMs = Date.now();

    await promise;

    waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 400 || waitedInMs > 600) {
      throw new E2edError(
        'waitForAllRequestsComplete did not wait for maxIntervalBetweenRequestsInMs between requests',
        {waitedInMs},
      );
    }

    promise = waitForAllRequestsComplete(() => true, {maxIntervalBetweenRequestsInMs: 300});

    await getUsers({delay: 1_000});

    startRequestInMs = Date.now();

    await promise;

    waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 200 || waitedInMs > 400) {
      throw new E2edError(
        'waitForAllRequestsComplete did not wait for maxIntervalBetweenRequestsInMs in the end',
        {waitedInMs},
      );
    }
  },
);

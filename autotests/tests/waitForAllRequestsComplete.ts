import {it} from 'autotests';
import {createClientFunction} from 'e2ed';
import {waitForAllRequestsComplete, waitForTimeout} from 'e2ed/actions';
import {E2edError, log} from 'e2ed/utils';

it(
  'waitForAllRequestsComplete works correct with timeout and predicate in base cases',
  {meta: {testId: '9'}, testIdleTimeout: 6_000},
  // eslint-disable-next-line complexity, max-statements
  async () => {
    let startRequestInMs = Date.now();

    await waitForAllRequestsComplete(() => true, {maxIntervalBetweenRequestsInMs: 300});

    let waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 300 || waitedInMs > 400) {
      throw new E2edError(
        'waitForAllRequestsComplete did not wait for maxIntervalBetweenRequestsInMs in the beginning',
        {waitedInMs},
      );
    }

    await waitForAllRequestsComplete(() => true, {timeout: 100}).then(
      () => {
        throw new E2edError('waitForAllRequestsComplete did not throw an error after timeout');
      },
      (error: unknown) => {
        log('Catch error from waitForAllRequestsComplete for {timeout: 100}', {error});
      },
    );

    await waitForAllRequestsComplete(() => true, {timeout: 1000});

    startRequestInMs = Date.now();

    let promise = waitForAllRequestsComplete(() => true, {timeout: 1000});

    const clientGetUsers = createClientFunction(
      (delay: number) => fetch(`https://reqres.in/api/users?delay=${delay}`, {method: 'GET'}),
      {name: 'getUsers', timeout: 6_000},
    );
    const getUsers = (delay: number): Promise<unknown> => {
      log(`Send API request with delay = ${delay}000ms`);

      return clientGetUsers(delay);
    };

    void getUsers(2);

    await promise.then(
      () => {
        throw new E2edError(
          'waitForAllRequestsComplete did not throw an error after timeout with real request',
        );
      },
      (error: unknown) => {
        log('Catch error from waitForAllRequestsComplete for {timeout: 1000}', {error});
      },
    );

    waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 1000 || waitedInMs > 1100) {
      throw new E2edError('waitForAllRequestsComplete did not wait for timeout', {waitedInMs});
    }

    void getUsers(2);

    startRequestInMs = Date.now();

    await waitForAllRequestsComplete(
      ({url}) => !url.includes('https://reqres.in/api/users?delay='),
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

    await getUsers(1);
    await waitForTimeout(400);
    await getUsers(1);

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

    await getUsers(1);

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

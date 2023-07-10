import {it} from 'autotests';
import {createClientFunction} from 'e2ed';
import {waitForAllRequestsComplete} from 'e2ed/actions';
import {log} from 'e2ed/utils';

it(
  'waitForAllRequestsComplete works correct with timeout and predicate in base cases',
  {meta: {testId: '9'}, testIdleTimeout: 3_000},
  async () => {
    let startRequestInMs = Date.now();

    await waitForAllRequestsComplete(() => true, {firstRequestTimeout: 300});

    let waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 300 || waitedInMs > 400) {
      throw new Error('waitForAllRequestsComplete did not wait for firstRequestTimeout');
    }

    await waitForAllRequestsComplete(() => true, {timeout: 100}).then(
      () => {
        throw new Error('waitForAllRequestsComplete did not throw an error after timeout');
      },
      () => undefined,
    );

    log('Catch error from waitForAllRequestsComplete for {timeout: 100}');

    await waitForAllRequestsComplete(() => true, {timeout: 1000});

    startRequestInMs = Date.now();

    const promise = waitForAllRequestsComplete(() => true, {timeout: 1000});

    const getUsers = createClientFunction(
      () => fetch('https://reqres.in/api/users?delay=2', {method: 'GET'}),
      {name: 'getUsers', timeout: 3_000},
    );

    void getUsers();

    await promise.then(
      () => {
        throw new Error(
          'waitForAllRequestsComplete did not throw an error after timeout with real request',
        );
      },
      () => undefined,
    );

    log('Catch error from waitForAllRequestsComplete for {timeout: 1000}');

    waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 1000 || waitedInMs > 1100) {
      throw new Error('waitForAllRequestsComplete did not wait for timeout');
    }

    void getUsers();

    startRequestInMs = Date.now();

    await waitForAllRequestsComplete(
      ({url}) => !url.includes('https://reqres.in/api/users?delay=2'),
      {timeout: 1000},
    );

    waitedInMs = Date.now() - startRequestInMs;

    if (waitedInMs < 500 || waitedInMs > 600) {
      throw new Error(
        'waitForAllRequestsComplete did not wait for firstRequestTimeout with filtered request',
      );
    }
  },
);

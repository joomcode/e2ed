import {assertNumberIsPositiveInteger} from '../asserts';

import type {UserlandPack} from '../../types/internal';

/**
 * Asserts that userland pack is correct.
 * @internal
 */
export const assertUserlandPack = (userlandPack: UserlandPack): void => {
  const logParams = {userlandPack};

  assertNumberIsPositiveInteger(
    userlandPack.assertionTimeout,
    'assertionTimeout is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.concurrency,
    'concurrency is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.maxRetriesCountInDocker,
    'maxRetriesCountInDocker is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.packTimeout,
    'packTimeout is positive integer',
    logParams,
  );

  if (userlandPack.pageRequestTimeout !== 0) {
    assertNumberIsPositiveInteger(
      userlandPack.pageRequestTimeout,
      'pageRequestTimeout is positive integer',
      logParams,
    );
  }

  if (userlandPack.pageStabilizationInterval !== 0) {
    assertNumberIsPositiveInteger(
      userlandPack.pageStabilizationInterval,
      'pageStabilizationInterval is positive integer',
      logParams,
    );
  }

  assertNumberIsPositiveInteger(userlandPack.port1, 'port1 is positive integer', logParams);
  assertNumberIsPositiveInteger(userlandPack.port2, 'port2 is positive integer', logParams);

  assertNumberIsPositiveInteger(
    userlandPack.selectorTimeout,
    'selectorTimeout is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.testIdleTimeout,
    'testIdleTimeout is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.testTimeout,
    'testTimeout is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.viewportHeight,
    'viewportHeight is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.viewportWidth,
    'viewportWidth is positive integer',
    logParams,
  );

  if (userlandPack.waitForAllRequestsComplete.maxIntervalBetweenRequestsInMs !== 0) {
    assertNumberIsPositiveInteger(
      userlandPack.waitForAllRequestsComplete.maxIntervalBetweenRequestsInMs,
      'waitForAllRequestsComplete.maxIntervalBetweenRequestsInMs is positive integer',
      logParams,
    );
  }

  assertNumberIsPositiveInteger(
    userlandPack.waitForAllRequestsComplete.timeout,
    'waitForAllRequestsComplete.timeout is positive integer',
    logParams,
  );

  if (userlandPack.waitForInterfaceStabilization.stabilizationInterval !== 0) {
    assertNumberIsPositiveInteger(
      userlandPack.waitForInterfaceStabilization.stabilizationInterval,
      'waitForInterfaceStabilization.stabilizationInterval is positive integer',
      logParams,
    );
  }

  assertNumberIsPositiveInteger(
    userlandPack.waitForInterfaceStabilization.timeout,
    'waitForInterfaceStabilization.timeout is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.waitForRequestTimeout,
    'waitForRequestTimeout is positive integer',
    logParams,
  );

  assertNumberIsPositiveInteger(
    userlandPack.waitForResponseTimeout,
    'waitForResponseTimeout is positive integer',
    logParams,
  );
};

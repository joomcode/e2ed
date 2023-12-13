import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

/**
 * Raw versions of `getTestIdleTimeout` and `setTestIdleTimeout`.
 * @internal
 */
const [getRawTestIdleTimeout, setRawTestIdleTimeout] = useContext<number>();

/**
 * Get test timeout in ms.
 * @internal
 */
export const getTestIdleTimeout = (): number => {
  const testIdleTimeout = getRawTestIdleTimeout();

  assertValueIsDefined(testIdleTimeout, 'testIdleTimeout is defined');

  return testIdleTimeout;
};

/**
 * Set test timeout in ms (can only be called once).
 * @internal
 */
export const setTestIdleTimeout: typeof setRawTestIdleTimeout = (testIdleTimeout) => {
  const currentTestIdleTimeout = getRawTestIdleTimeout();

  assertValueIsUndefined(currentTestIdleTimeout, 'currentTestIdleTimeout is not defined', {
    testIdleTimeout,
  });

  return setRawTestIdleTimeout(testIdleTimeout);
};

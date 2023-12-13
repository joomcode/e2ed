import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

/**
 * Raw versions of `getTestTimeout` and `setTestTimeout`.
 * @internal
 */
const [getRawTestTimeout, setRawTestTimeout] = useContext<number>();

/**
 * Get test timeout in ms.
 * @internal
 */
export const getTestTimeout = (): number => {
  const testTimeout = getRawTestTimeout();

  assertValueIsDefined(testTimeout, 'testTimeout is defined');

  return testTimeout;
};

/**
 * Set test timeout in ms (can only be called once).
 * @internal
 */
export const setTestTimeout: typeof setRawTestTimeout = (testTimeout) => {
  const currentTestTimeout = getRawTestTimeout();

  assertValueIsUndefined(currentTestTimeout, 'currentTestTimeout is not defined', {testTimeout});

  return setRawTestTimeout(testTimeout);
};

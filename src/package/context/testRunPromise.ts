import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

/**
 * Raw versions of getTestRunPromise and setTestRunPromise.
 * @internal
 */
const [getRawTestRunPromise, setRawTestRunPromise] = useContext<Promise<void>>();

/**
 * Get test run promise (it resolves when the test completes).
 * @internal
 */
export const getTestRunPromise = (): Promise<void> => {
  const testRunPromise = getRawTestRunPromise();

  assertValueIsDefined(testRunPromise, 'testRunPromise is defined');

  return testRunPromise;
};

/**
 * Set test timeout in ms (can only be called once).
 * @internal
 */
export const setTestRunPromise: typeof setRawTestRunPromise = (testRunPromise) => {
  const currentTestRunPromise = getRawTestRunPromise();

  assertValueIsUndefined(currentTestRunPromise, 'currentTestRunPromise is not defined', {
    testRunPromise,
  });

  return setRawTestRunPromise(testRunPromise);
};

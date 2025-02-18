import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

import type {TestStaticOptions} from '../types/internal';

/**
 * Raw get and set test static options.
 * @internal
 */
const [getRawTestStaticOptions, setRawTestStaticOptions] = useContext<TestStaticOptions>();

/**
 * Get test static options.
 * @internal
 */
export const getTestStaticOptions = (): TestStaticOptions => {
  const testStaticOptions = getRawTestStaticOptions();

  assertValueIsDefined(testStaticOptions, 'testStaticOptions is defined');

  return testStaticOptions;
};

/**
 * Set test static options.
 * @internal
 */
export const setTestStaticOptions: typeof setRawTestStaticOptions = (testStaticOptions) => {
  const currentTestStaticOptions = getRawTestStaticOptions();

  assertValueIsUndefined(currentTestStaticOptions, 'currentTestStaticOptions is not defined', {
    testStaticOptions,
  });

  setRawTestStaticOptions(testStaticOptions);
};

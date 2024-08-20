import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

/**
 * Raw get and set test retry index.
 */
const [getRawRetryIndex, setRawRetryIndex] = useContext<number>();

/**
 * Get test retry index.
 */
export const getRetryIndex = (): number => {
  const retryIndex = getRawRetryIndex();

  assertValueIsDefined(retryIndex, 'retryIndex is defined');

  return retryIndex;
};

/**
 * Set test retry index.
 * @internal
 */
export const setRetryIndex: typeof setRawRetryIndex = (retryIndex) => {
  const currentRetryIndex = getRawRetryIndex();

  assertValueIsUndefined(currentRetryIndex, 'currentRetryIndex is not defined', {retryIndex});

  setRawRetryIndex(retryIndex);
};

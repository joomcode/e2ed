import {useContext} from '../useContext';
import {assertValueIsUndefined} from '../utils/asserts';

/**
 * Get test run error and raw version of set test run error.
 * @internal
 */
const [getRunError, setRawRunError] = useContext<string | undefined>(undefined);

/**
 * Get test run error.
 * @internal
 */
export {getRunError};

/**
 * Set test run error (can only be called once).
 * @internal
 */
export const setRunError = (runError: string): void => {
  const currentRunError = getRunError();

  assertValueIsUndefined(currentRunError, 'currentRunError is not defined', {
    currentRunError,
    runError,
  });

  return setRawRunError(runError);
};

import {useContext} from '../useContext';
import {assertValueIsUndefined} from '../utils/asserts';

import type {FullMocksState} from '../types/internal';

/**
 * Raw versions of `getFullMocksState` and `setFullMocksState`.
 * @internal
 */
const [getFullMocksState, setRawFullMocksState] = useContext<FullMocksState>();

/**
 * Get state of full mocks.
 * @internal
 */
export {getFullMocksState};

/**
 * Set state of full mocks (can only be called once).
 * @internal
 */
export const setFullMocksState: typeof setRawFullMocksState = (fullMocksState) => {
  const currentFullMocksState = getFullMocksState();

  assertValueIsUndefined(currentFullMocksState, 'currentFullMocksState is not defined', {
    fullMocksState,
  });

  return setRawFullMocksState(fullMocksState);
};

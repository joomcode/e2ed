import {useContext} from '../useContext';

import type {ResponseWithRequest} from '../types/internal';

type Callback = (this: void, response: ResponseWithRequest) => void;

/**
 * Raw get and set `onResponseCallbacks` list.
 * @internal
 */
const [getRawOnResponseCallbacks, setRawOnResponseCallbacks] = useContext<Callback[]>();

/**
 * Get `onResponseCallbacks` list.
 * @internal
 */
export const getOnResponseCallbacks = (): Callback[] => {
  const maybeCallbacks = getRawOnResponseCallbacks();

  if (maybeCallbacks !== undefined) {
    return maybeCallbacks;
  }

  const callbacks: Callback[] = [];

  setRawOnResponseCallbacks(callbacks);

  return callbacks;
};

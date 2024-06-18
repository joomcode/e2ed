import {useContext} from '../useContext';

import type {ResponseWithRequest} from '../types/internal';

type Callback = (this: void, response: ResponseWithRequest) => void;

/**
 * Get `onResponseCallbacks` list.
 * @internal
 */
export const [getOnResponseCallbacks] = useContext<Callback[]>([]);

import {useContext} from '../useContext';

import type {ApiMockState} from '../types/internal';

/**
 * Raw get and set internal (maybe undefined) API mock state.
 * @internal
 */
const [getRawApiMockState, setRawApiMockState] = useContext<ApiMockState>();

/**
 * Get internal always defined API mock state (for mockApiRoute).
 * @internal
 */
export const getApiMockState = (): ApiMockState => {
  const maybeApiMockState = getRawApiMockState();

  if (maybeApiMockState !== undefined) {
    return maybeApiMockState;
  }

  const apiMockState: ApiMockState = {
    functionAndRouteByUrl: {},
    functionByRoute: undefined,
  };

  setRawApiMockState(apiMockState);

  return apiMockState;
};

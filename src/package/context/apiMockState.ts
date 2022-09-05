import {useContext} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';

import type {ApiMockState} from '../types/internal';

const [getRawApiMockState] = useContext<ApiMockState>({
  functionAndRouteByUrl: {},
  functionByRoute: undefined,
});

/**
 * Get internal API mock state (for mockApiRoute).
 * @internal
 */
export const getApiMockState = (): ApiMockState => {
  const apiMockState = getRawApiMockState();

  assertValueIsDefined(apiMockState, 'apiMockState is defined');

  return apiMockState;
};

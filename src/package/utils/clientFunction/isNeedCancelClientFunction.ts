import type {ClientFunctionState, MaybeTestCafeError} from '../../types/internal';

/**
 * Code of TestCafe internal "interrupted by page unload" error.
 */
const INTERRUPTED_BY_PAGE_UNLOAD_CODE = 'E49';

/**
 * Return true if client function cancellation is needed, false otherwise.
 * @internal
 */
export const isNeedCancelClientFunction = <Args extends unknown[], R>(
  error: MaybeTestCafeError,
  clientFunctionState: ClientFunctionState<Args, R>,
): boolean => {
  const {code} = error ?? {};
  const {name} = clientFunctionState;

  return code === INTERRUPTED_BY_PAGE_UNLOAD_CODE && name === 'waitForInterfaceStabilization';
};

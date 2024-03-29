import type {ClientFunctionState, MaybeTestCafeError} from '../../types/internal';

/**
 * Code of TestCafe internal "interrupted by page unload" error.
 */
const INTERRUPTED_BY_PAGE_UNLOAD_CODE = 'E49';

/**
 * Returns `true` if client function rerun is needed and `false` otherwise.
 * @internal
 */
export const isNeedRerunClientFunction = <Args extends readonly unknown[], Result>(
  error: MaybeTestCafeError,
  clientFunctionState: ClientFunctionState<Args, Result>,
): boolean => {
  const {code} = error ?? {};
  const {name} = clientFunctionState;

  return code === INTERRUPTED_BY_PAGE_UNLOAD_CODE && name === 'waitForInterfaceStabilization';
};

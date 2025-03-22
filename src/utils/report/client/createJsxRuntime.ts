/**
 * Creates JSX runtime (functions `createElement` and `Fragment`).
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function createJsxRuntime(): JSX.Runtime {
  const createElement: JSX.CreateElement = (type, properties, ...children) => '';
  const Fragment: JSX.Fragment = ({children}) => '';

  return {createElement, Fragment};
}

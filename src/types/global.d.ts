/* eslint-disable import/no-unused-modules, import/unambiguous */

/**
 * Extends node's require function.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface NodeRequire {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  <ModuleExports = import('./utils').Any>(modulePath: string): ModuleExports;
}

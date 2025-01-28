/**
 * Extends node's require function.
 * @internal
 */
// eslint-disable-next-line import/no-unused-modules
declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Require {
      // eslint-disable-next-line @typescript-eslint/prefer-function-type
      <ModuleExports = import('./utils').Any>(modulePath: string): ModuleExports;
    }
  }
}

export type {};

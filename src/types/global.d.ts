/* eslint-disable import/no-default-export, import/no-unused-modules, import/unambiguous */

/**
 * Extends node's require function.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface NodeRequire {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  <ModuleExports = import('./utils').Any>(modulePath: string): ModuleExports;
}

/**
 * Package for filtering V8 command line flags when run TestCafe via CLI.
 * @internal
 */
declare module 'bin-v8-flags-filter' {
  type Options = Readonly<{
    forcedKillDelay?: number;
    ignore?: string[];
    useShutdownMessage?: boolean;
  }>;

  /**
   * Filters out `nodejs` cli options and runs node module on `cliPath`.
   */
  const v8FlagsFilter: (cliPath: string, options: Options) => void;

  export default v8FlagsFilter;
}

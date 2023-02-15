import type {FullPackConfig} from '../types/internal';

/**
 * Get full pack configuration object.
 * This function can only be called after the E2edRunEvent is registered,
 * because the packs with configurations (e2ed/packs) is compiled when this event is registered.
 * @internal
 */
export const getFullPackConfig = <
  SkipTests = unknown,
  CustomPackProperties = unknown,
>(): FullPackConfig<SkipTests, CustomPackProperties> => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const {fullPackConfig} = require<typeof import('../testcaferc')>('../testcaferc');

  return fullPackConfig as FullPackConfig<SkipTests, CustomPackProperties>;
};

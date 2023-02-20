import type {FullPackConfig} from '../types/internal';

/**
 * Get full pack configuration object.
 * This function can only be called after the E2edRunEvent is registered,
 * because the packs with configurations (e2ed/packs) is compiled when this event is registered.
 * @internal
 */
export const getFullPackConfig = <
  CustomPackProperties = unknown,
  CustomReportProperties = unknown,
  SkipTests = unknown,
  TestMeta = unknown,
>(): FullPackConfig<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta> => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const {fullPackConfig} = require<typeof import('../testcaferc')>('../testcaferc');

  return fullPackConfig as unknown as FullPackConfig<
    CustomPackProperties,
    CustomReportProperties,
    SkipTests,
    TestMeta
  >;
};

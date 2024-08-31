// eslint-disable-next-line import/no-internal-modules
import {readStartInfoSync} from '../fs/readStartInfoSync';

import {updateConfig} from './updateConfig';

import type {FullPackConfig} from '../../types/internal';

let updatedConfig: FullPackConfig | undefined;

/**
 * Get full pack configuration object.
 * This function can only be called after the `E2edRunEvent` is registered,
 * because the packs with configurations (`e2ed/packs`) is compiled when this event is registered.
 */
export const getFullPackConfig = <
  CustomPackProperties = unknown,
  CustomReportProperties = unknown,
  SkipTests = unknown,
  TestMeta = unknown,
>(): FullPackConfig<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta> => {
  if (updatedConfig === undefined) {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const fullPackConfig = require<typeof import('../../config')>('../../config').default;

    updatedConfig = fullPackConfig;

    try {
      const startInfo = readStartInfoSync();

      updateConfig(updatedConfig, startInfo);
    } catch {}
  }

  return updatedConfig as unknown as FullPackConfig<
    CustomPackProperties,
    CustomReportProperties,
    SkipTests,
    TestMeta
  >;
};

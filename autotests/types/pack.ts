import type {PackConfig} from 'e2ed/configurator';

import type {CustomPackProperties} from './customPackProperties';
import type {SkipTests} from './skipTests';
import type {TestMeta} from './testMeta';

/**
 * Project's pack (userland configuration of pack).
 */
export type Pack = PackConfig<CustomPackProperties, SkipTests, TestMeta>;

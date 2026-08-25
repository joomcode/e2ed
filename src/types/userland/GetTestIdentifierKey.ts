import type {IsEqual} from '../checks';
import type {ProjectSettings} from '../projectSettings';

/**
 * Get type of test identifier key
 */
export type GetTestIdentifierKey<Settings extends ProjectSettings> =
  IsEqual<keyof Settings['testIdentifierKey'], never> extends true
    ? undefined
    : keyof Settings['testIdentifierKey'];

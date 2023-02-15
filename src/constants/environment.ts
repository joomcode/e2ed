import type {E2edEnvironment} from '../types/internal';

/**
 * Object with environment variables of e2ed run.
 * @internal
 */
export const e2edEnvironment = process.env as E2edEnvironment;

/**
 * Name of e2ed environment variables with path to pack.
 * @internal
 */
export const PATH_TO_PACK_VARIABLE_NAME = '__INTERNAL_E2ED_PATH_TO_PACK';

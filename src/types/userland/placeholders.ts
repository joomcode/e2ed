import type {Brand} from '../brand';

/**
 * Placeholder for userland type of custom pack properties.
 */
export type CustomPackPropertiesPlaceholder = Brand<unknown, 'CustomPackPropertiesPlaceholder'>;

/**
 * Placeholder for userland type of custom report properties, that `doAfterPack` functions
 * can return when the pack completes.
 */
export type CustomReportPropertiesPlaceholder = Brand<unknown, 'CustomReportPropertiesPlaceholder'>;

/**
 * Placeholder for userland type of skipped tests list.
 */
export type SkipTestsPlaceholder = Brand<unknown, 'SkipTestsPlaceholder'>;

/**
 * Placeholder for userland type of test metadata information.
 */
export type TestMetaPlaceholder = Brand<unknown, 'TestMetaPlaceholder'>;

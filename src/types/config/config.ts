import type {DeepReadonly} from '../deep';
import type {
  CustomPackPropertiesPlaceholder,
  CustomReportPropertiesPlaceholder,
  SkipTestsPlaceholder,
  TestMetaPlaceholder,
} from '../userland';

import type {WithDoBeforePack} from './doBeforePack';
import type {OwnE2edConfig} from './ownE2edConfig';

/**
 * Userland part of TestCafe config.
 */
type UserlandTestCafeConfig = Readonly<{
  ajaxRequestTimeout: number;
  assertionTimeout: number;
  browserInitTimeout: number;
  browser: string;
  concurrency: number;
  pageRequestTimeout: number;
  port1: number;
  port2: number;
  selectorTimeout: number;
}>;

/**
 * Frozen (readonly) part of TestCafe config.
 */
export type FrozenPartOfTestCafeConfig = DeepReadonly<{
  color: boolean;
  compilerOptions: {
    typescript?: {
      customCompilerModulePath?: string;
      options?: {esModuleInterop?: boolean; resolveJsonModule?: boolean};
    };
  };
  hostname: string;
  pageLoadTimeout: number;
  reporter: readonly {name: string; output?: string}[];
  retryTestPages: boolean;
  screenshots: {
    path: string;
    pathPattern: string;
    takeOnFails: boolean;
    thumbnails: boolean;
  };
  skipJsErrors: boolean;
}>;

/**
 * The complete pack configuration object without `doBeforePack` property.
 */
export type FullPackConfigWithoutDoBeforePack<
  CustomPackProperties = unknown,
  CustomReportProperties = unknown,
  SkipTests = unknown,
  TestMeta = unknown,
> = (unknown extends CustomPackProperties
  ? UserlandPackWithoutDoBeforePack
  : UserlandPackWithoutDoBeforePack<
      CustomPackProperties,
      CustomReportProperties,
      SkipTests,
      TestMeta
    >) &
  FrozenPartOfTestCafeConfig &
  Readonly<{browsers: string; src: readonly string[]}>;

/**
 * The complete userland pack config.
 */
export type UserlandPack<
  CustomPackProperties = CustomPackPropertiesPlaceholder,
  CustomReportProperties = CustomReportPropertiesPlaceholder,
  SkipTests = SkipTestsPlaceholder,
  TestMeta = TestMetaPlaceholder,
> = UserlandPackWithoutDoBeforePack<
  CustomPackProperties,
  CustomReportProperties,
  SkipTests,
  TestMeta
> &
  WithDoBeforePack<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta>;

/**
 * The complete userland pack config without `doBeforePack` property.
 */
export type UserlandPackWithoutDoBeforePack<
  CustomPackProperties = CustomPackPropertiesPlaceholder,
  CustomReportProperties = CustomReportPropertiesPlaceholder,
  SkipTests = SkipTestsPlaceholder,
  TestMeta = TestMetaPlaceholder,
> = UserlandTestCafeConfig &
  OwnE2edConfig<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta>;

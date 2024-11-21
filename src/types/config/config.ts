import type {PlaywrightTestConfig} from '@playwright/test';

import type {
  CustomPackPropertiesPlaceholder,
  CustomReportPropertiesPlaceholder,
  SkipTestsPlaceholder,
  TestMetaPlaceholder,
} from '../userland';

import type {WithDoBeforePack} from './doBeforePack';
import type {OwnE2edConfig} from './ownE2edConfig';

/**
 * Supported browsers.
 */
export type BrowserName = 'chromium' | 'firefox' | 'webkit';

/**
 * The complete pack configuration object without `doBeforePack` field.
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
  PlaywrightTestConfig;

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
 * The complete userland pack config without `doBeforePack` field.
 */
export type UserlandPackWithoutDoBeforePack<
  CustomPackProperties = CustomPackPropertiesPlaceholder,
  CustomReportProperties = CustomReportPropertiesPlaceholder,
  SkipTests = SkipTestsPlaceholder,
  TestMeta = TestMetaPlaceholder,
> = Readonly<{
  assertionTimeout: number;
  concurrency: number;
  port1: number;
  port2: number;
  selectorTimeout: number;
}> &
  OwnE2edConfig<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta>;

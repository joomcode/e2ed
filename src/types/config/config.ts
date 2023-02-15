import type {DeepReadonly} from '../deep';
import type {
  CustomPackPropertiesPlaceholder,
  SkipTestsPlaceholder,
  TestMetaPlaceholder,
} from '../userland';
import type {Any} from '../utils';

import type {OwnE2edConfig} from './ownE2edConfig';

/**
 * Userland part of TestCafe config.
 */
type UserlangTestCafeConfig = Readonly<{
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
 * Common type of any pack for extends constraint.
 */
export type AnyPack = UserlandConfig<Any, Any, Any>;

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
 * The complete pack configuration object.
 */
export type FullPackConfig<
  CustomPackProperties = unknown,
  SkipTests = unknown,
  TestMeta = unknown,
> = (unknown extends CustomPackProperties
  ? UserlandConfig
  : UserlandConfig<CustomPackProperties, SkipTests, TestMeta>) &
  FrozenPartOfTestCafeConfig &
  Readonly<{browsers: string; src: readonly string[]}>;

/**
 * Type of userland getFullPackConfig function (with defined Pack type).
 */
export type GetFullPackConfig<Pack extends AnyPack> = Pack extends UserlandConfig<
  infer CustomPackProperties,
  infer SkipTests,
  infer TestMeta
>
  ? () => FullPackConfig<CustomPackProperties, SkipTests, TestMeta>
  : never;

/**
 * Get pack type parameters (CustomPackProperties, SkipTests and TestMeta) from given Pack type.
 */
export type GetPackParameters<Pack extends AnyPack> = Pack extends UserlandConfig<
  infer CustomPackProperties,
  infer SkipTests,
  infer TestMeta
>
  ? Readonly<{
      CustomPackProperties: CustomPackProperties;
      SkipTests: SkipTests;
      TestMeta: TestMeta;
    }>
  : never;

/**
 * The complete userland e2ed config.
 */
export type UserlandConfig<
  CustomPackProperties = CustomPackPropertiesPlaceholder,
  SkipTests = SkipTestsPlaceholder,
  TestMeta = TestMetaPlaceholder,
> = UserlangTestCafeConfig & OwnE2edConfig<CustomPackProperties, SkipTests, TestMeta>;

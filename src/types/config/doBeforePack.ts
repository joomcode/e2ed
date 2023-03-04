import type {MaybePromise} from '../promise';
import type {StartInfo} from '../startInfo';
import type {Void} from '../undefined';
import type {Any} from '../utils';

import type {
  FullPackConfigWithoutDoBeforePack,
  UserlandPack,
  UserlandPackWithoutDoBeforePack,
} from './config';

/**
 * Typed parameters of pack, defined in userland.
 */
type PackParameters<
  CustomPackProperties = unknown,
  CustomReportProperties = unknown,
  SkipTests = unknown,
  TestMeta = unknown,
> = Readonly<{
  CustomPackProperties: CustomPackProperties;
  CustomReportProperties: CustomReportProperties;
  SkipTests: SkipTests;
  TestMeta: TestMeta;
}>;

/**
 * Get pack type parameters from given Pack type (without extends of AnyPackParameters).
 */
type UntypedGetPackParameters<Pack extends AnyPack> = Pack extends UserlandPack<
  infer CustomPackProperties,
  infer CustomReportProperties,
  infer SkipTests,
  infer TestMeta
>
  ? PackParameters<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta>
  : never;

/**
 * Separate property `doBeforePack` of userland pack config.
 */
export type WithDoBeforePack<
  CustomPackProperties,
  CustomReportProperties,
  SkipTests,
  TestMeta,
  ConcreteFullPackConfigWithoutDoBeforePack = FullPackConfigWithoutDoBeforePack<
    CustomPackProperties,
    CustomReportProperties,
    SkipTests,
    TestMeta
  >,
> = Readonly<{
  /**
   * An array of functions that will be executed, in order, before the pack starts.
   * The functions accept a start info object, and can return new full pack config,
   * which in this case will be included in the start info object,
   * and will be used for running pack.
   * Each function can thus access the results of the previous function.
   */
  doBeforePack: readonly ((
    this: void,
    startInfo: StartInfo<ConcreteFullPackConfigWithoutDoBeforePack>,
  ) => MaybePromise<ConcreteFullPackConfigWithoutDoBeforePack | Void>)[];
}>;

/**
 * Common type of any pack for extends constraint.
 */
export type AnyPack = Omit<UserlandPackWithoutDoBeforePack<Any, Any, Any, Any>, 'doAfterPack'>;

/**
 * Common type of any pack parameters.
 */
export type AnyPackParameters = PackParameters<Any, Any, Any, Any>;

/**
 * The complete pack configuration object.
 */
export type FullPackConfig<
  CustomPackProperties = unknown,
  CustomReportProperties = unknown,
  SkipTests = unknown,
  TestMeta = unknown,
> = FullPackConfigWithoutDoBeforePack<
  CustomPackProperties,
  CustomReportProperties,
  SkipTests,
  TestMeta
> &
  WithDoBeforePack<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta>;

/**
 * Type of complete pack configuration object, get by type of Pack (userland part of config).
 */
export type FullPackConfigByPack<
  Pack extends AnyPack,
  PackParams extends PackParameters = GetPackParameters<Pack>,
> = FullPackConfig<
  PackParams['CustomPackProperties'],
  PackParams['CustomReportProperties'],
  PackParams['SkipTests'],
  PackParams['TestMeta']
>;

/**
 * Get pack type parameters (CustomPackProperties, SkipTests and TestMeta) from given Pack type.
 */
export type GetPackParameters<
  Pack extends AnyPack,
  UntypedPackParameters = UntypedGetPackParameters<Pack>,
> = UntypedPackParameters extends AnyPackParameters ? UntypedPackParameters : never;

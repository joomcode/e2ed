import type {AnyPack, AnyPackParameters, FullPackConfigByPack, GetPackParameters} from '../config';

import type {UserlandHooks} from './userlandHooks';

/**
 * Creates pack-specific types of some functions (of hooks and functions in pack config).
 */
export type CreatePackSpecificTypes<
  Pack extends AnyPack,
  PackParameters extends AnyPackParameters = GetPackParameters<Pack>,
  Hooks extends UserlandHooks<AnyPackParameters> = UserlandHooks<PackParameters['TestMeta']>,
> = Readonly<{
  DoAfterPack: Pack['doAfterPack'][number];
  DoBeforePack: FullPackConfigByPack<Pack>['doBeforePack'][number];
  GetFullPackConfig: () => FullPackConfigByPack<Pack>;
  GetLogContext: Hooks['getLogContext'];
  GetMainTestRunParams: Hooks['getMainTestRunParams'];
  GetTestRunHash: Hooks['getTestRunHash'];
  IsTestIncludedInPack: Pack['isTestIncludedInPack'];
  IsTestSkipped: Hooks['isTestSkipped'];
  NavigateTo: Hooks['navigateTo'];
}>;

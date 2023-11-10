import type {AnyPack, AnyPackParameters, FullPackConfigByPack, GetPackParameters} from '../config';
import type {MapLogPayload, MapLogPayloadInReport} from '../log';
import type {LiteReport} from '../report';

import type {UserlandHooks} from './userlandHooks';

/**
 * Creates pack-specific types of some functions (of hooks and functions in pack config)
 * and objects (lite report).
 */
export type CreatePackSpecificTypes<
  Pack extends AnyPack,
  PackParameters extends AnyPackParameters = GetPackParameters<Pack>,
  Hooks extends UserlandHooks<AnyPackParameters> = UserlandHooks<PackParameters['TestMeta']>,
> = Readonly<{
  DoAfterPack: FullPackConfigByPack<Pack>['doAfterPack'][number];
  DoBeforePack: FullPackConfigByPack<Pack>['doBeforePack'][number];
  FilterTestsIntoPack: Pack['filterTestsIntoPack'];
  GetFullPackConfig: () => FullPackConfigByPack<Pack>;
  GetLogContext: Hooks['getLogContext'];
  GetMainTestRunParams: Hooks['getMainTestRunParams'];
  GetTestRunHash: Hooks['getTestRunHash'];
  IsTestSkipped: Hooks['isTestSkipped'];
  LiteReport: LiteReport<
    PackParameters['CustomPackProperties'],
    PackParameters['CustomReportProperties'],
    PackParameters['SkipTests'],
    PackParameters['TestMeta']
  >;
  MapLogPayloadInConsole: MapLogPayload;
  MapLogPayloadInLogFile: MapLogPayload;
  MapLogPayloadInReport: MapLogPayloadInReport;
  NavigateTo: Hooks['navigateTo'];
}>;

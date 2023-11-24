import type {Pack} from 'autotests/types/pack';
import type {CreatePackSpecificTypes} from 'e2ed/types';

/**
 * Pack-specific types of some project functions (of hooks and functions from pack config).
 */
type PackSpecificTypes = CreatePackSpecificTypes<Pack>;

export type DoAfterPack = PackSpecificTypes['DoAfterPack'];
export type DoBeforePack = PackSpecificTypes['DoBeforePack'];
export type GetFullPackConfig = PackSpecificTypes['GetFullPackConfig'];
export type GetLogContext = PackSpecificTypes['GetLogContext'];
export type GetMainTestRunParams = PackSpecificTypes['GetMainTestRunParams'];
export type GetTestRunHash = PackSpecificTypes['GetTestRunHash'];
export type FilterTestsIntoPack = PackSpecificTypes['FilterTestsIntoPack'];
export type IsTestSkipped = PackSpecificTypes['IsTestSkipped'];
export type LiteReport = PackSpecificTypes['LiteReport'];
export type MapBackendResponseErrorToLog = PackSpecificTypes['MapBackendResponseErrorToLog'];
export type MapBackendResponseToLog = PackSpecificTypes['MapBackendResponseToLog'];
export type MapLogPayloadInConsole = PackSpecificTypes['MapLogPayloadInConsole'];
export type MapLogPayloadInLogFile = PackSpecificTypes['MapLogPayloadInLogFile'];
export type MapLogPayloadInReport = PackSpecificTypes['MapLogPayloadInReport'];
export type NavigateTo = PackSpecificTypes['NavigateTo'];
export type {Pack};

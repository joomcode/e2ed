import type {CreatePackSpecificTypes} from 'e2ed/types';

import type {Pack} from './pack';

/**
 * Pack-specific types of some project functions (of hooks and functions from pack config)
 * and objects (lite report).
 */
type PackSpecificTypes = CreatePackSpecificTypes<Pack>;

export type DoAfterPack = PackSpecificTypes['DoAfterPack'];
export type DoBeforePack = PackSpecificTypes['DoBeforePack'];
export type GetFullPackConfig = PackSpecificTypes['GetFullPackConfig'];
export type GetLogContext = PackSpecificTypes['GetLogContext'];
export type GetMainTestRunParams = PackSpecificTypes['GetMainTestRunParams'];
export type GetTestRunHash = PackSpecificTypes['GetTestRunHash'];
export type FilterTestsIntoPack = PackSpecificTypes['FilterTestsIntoPack'];
export type FullMocks = PackSpecificTypes['FullMocks'];
export type IsTestSkipped = PackSpecificTypes['IsTestSkipped'];
export type LiteReport = PackSpecificTypes['LiteReport'];
export type MapBackendResponseErrorToLog = PackSpecificTypes['MapBackendResponseErrorToLog'];
export type MapBackendResponseToLog = PackSpecificTypes['MapBackendResponseToLog'];
export type MapLogPayloadInConsole = PackSpecificTypes['MapLogPayloadInConsole'];
export type MapLogPayloadInLogFile = PackSpecificTypes['MapLogPayloadInLogFile'];
export type MapLogPayloadInReport = PackSpecificTypes['MapLogPayloadInReport'];
export type MatchScreenshot = PackSpecificTypes['MatchScreenshot'];
export type TestFunction = PackSpecificTypes['TestFunction'];
export type WaitBeforeRetry = PackSpecificTypes['WaitBeforeRetry'];
export type {Pack};

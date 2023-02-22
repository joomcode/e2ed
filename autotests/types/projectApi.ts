import type {Pack} from 'autotests/types/pack';
import type {CreateProjectApiTypes} from 'e2ed/types';

/**
 * Types of some project functions (of hooks and functions from pack config).
 */
type ProjectApiTypes = CreateProjectApiTypes<Pack>;

export type DoAfterPack = ProjectApiTypes['DoAfterPack'];
export type DoBeforePack = ProjectApiTypes['DoBeforePack'];
export type GetLogContext = ProjectApiTypes['GetLogContext'];
export type GetMainTestRunParams = ProjectApiTypes['GetMainTestRunParams'];
export type GetTestRunHash = ProjectApiTypes['GetTestRunHash'];
export type IsTestIncludedInPack = ProjectApiTypes['IsTestIncludedInPack'];
export type IsTestSkipped = ProjectApiTypes['IsTestSkipped'];
export type NavigateTo = ProjectApiTypes['NavigateTo'];
export type {Pack};

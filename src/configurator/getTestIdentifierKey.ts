import type {GetTestIdentifierKey, ProjectSettings} from '../types/internal';

/**
 * Get test identifier key from project settings.
 */
export const getTestIdentifierKey = <const Settings extends ProjectSettings>(
  projectSettings: Settings,
): GetTestIdentifierKey<Settings> =>
  Object.keys(projectSettings.testIdentifierKey)[0] as GetTestIdentifierKey<Settings>;

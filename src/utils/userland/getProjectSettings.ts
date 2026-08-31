import {join} from 'node:path';

import {
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  PROJECT_SETTINGS_PATH,
  // eslint-disable-next-line import/no-internal-modules, import/no-restricted-paths
} from '../../constants/paths';

import type {ProjectSettings} from '../../types/internal';

const absoluteProjectSettingsPath = join(
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  PROJECT_SETTINGS_PATH,
);

/**
 * Get static project settings.
 */
export const getProjectSettings = (): ProjectSettings =>
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require<ProjectSettings>(absoluteProjectSettingsPath);

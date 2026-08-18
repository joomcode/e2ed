import {getTestIdentifierKey} from 'e2ed/configurator';

import projectSettings from '../projectSettings.json';

import type {GetTestIdentifierKey} from 'e2ed/types';

/**
 * Project test identifier key in test meta.
 */
export const testIdentifierKey: GetTestIdentifierKey<typeof projectSettings> =
  getTestIdentifierKey(projectSettings);

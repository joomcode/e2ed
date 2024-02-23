import {pack as allTestsPack} from './allTests';

import type {Pack} from 'autotests/configurator';

/**
 * Pack from .gitignore for local development.
 */
export const pack: Pack = {
  ...allTestsPack,
  browserInitTimeout: 40_000,
};

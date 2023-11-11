import {pack as allTestsPack} from './allTests';

import type {Pack} from 'autotests/types/pack';

/**
 * Pack from .gitignore for local development.
 */
export const pack: Pack = {
  ...allTestsPack,
  browserInitTimeout: 40_000,
  dockerImage: 'e2edhub/e2ed',
};

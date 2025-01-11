/**
 * @file Pack for local development.
 * Do not import anything (from `utils`, etc) into this file other than
 * the types and values from `../configurator`, `e2ed/configurator`
 * or other packs (because the pack is compiled separately from the tests themselves
 * and has separate TypeScript scope).
 */

import {pack as allTestsPack} from './allTests';

import type {Pack} from 'autotests/configurator';

/**
 * Pack from `.gitignore` for local development.
 */
export const pack: Pack = {
  ...allTestsPack,
  testIdleTimeout: 10_000,
};

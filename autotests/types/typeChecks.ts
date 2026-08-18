import type {Pack, testIdentifierKey} from 'autotests/configurator';
import type {pack as allTestsPack} from 'autotests/packs/allTests';
import type {Expect, IsEqual, IsUnion, Not} from 'e2ed/types';

/**
 * Type checks of all project packs and test identifier key.
 */
export type TypeChecks = [
  Expect<IsEqual<Pack, typeof allTestsPack>>,
  Expect<Not<IsUnion<typeof testIdentifierKey>>>,
];

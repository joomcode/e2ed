import type {Pack} from 'autotests/configurator';
import type {pack as allTestsPack} from 'autotests/packs/allTests';
import type {Expect, IsEqual} from 'e2ed/types';

/**
 * Type checks of all project packs.
 */
export type PacksTypeChecks = [Expect<IsEqual<Pack, typeof allTestsPack>>];

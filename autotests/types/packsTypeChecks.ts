import type {pack as allTestsPack} from 'autotests/packs/allTests';
import type {Pack} from 'autotests/types/packSpecific';
import type {Expect, IsEqual} from 'e2ed/types';

/**
 * Type checks of all project packs.
 */
export type PacksTypeChecks = [Expect<IsEqual<Pack, typeof allTestsPack>>];

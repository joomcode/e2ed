import type {pack as allTestsPack} from 'autotests/packs/allTests';
import type {Pack} from 'autotests/types/pack';
import type {Expect, IsEqual} from 'e2ed/types';

/**
 * Typechecks of all project packs.
 */
export type PacksTypechecks = [Expect<IsEqual<Pack, typeof allTestsPack>>];

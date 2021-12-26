/**
 * @file A module for checking the compliance of external modules with specified type contracts.
 * Do not remove this module.
 */

import type {Expect, ExternalHooks, IsEqual} from 'e2ed/types';

import type * as Hooks from '../hooks';

declare const checks: [Expect<IsEqual<ExternalHooks, typeof Hooks>>];

void checks;

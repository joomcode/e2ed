/**
 * @file A module for checking the compliance of project hooks,
 * config and other parts with specified type contracts.
 * Do not remove this module.
 */

import type {Config, Expect, ExternalHooks, IsEqual} from 'e2ed/types';

import type {config} from '../config';
import type * as hooks from '../hooks';

// eslint-disable-next-line
declare const checks: [
  Expect<IsEqual<Config, typeof config>>,
  Expect<IsEqual<ExternalHooks, typeof hooks>>,
];

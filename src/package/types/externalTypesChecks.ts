/**
 * @file A module for checking the compliance of project hooks,
 * config and other parts with specified type contracts.
 */

import type {config} from '../../../e2ed/config';
import type * as hooks from '../../../e2ed/hooks';

import type {UserlandConfig} from './config';
import type {ExternalHooks} from './externalHooks';
import type {Expect, IsEqual} from './utils';

export declare type ExternalTypesChecks = [
  Expect<IsEqual<UserlandConfig, typeof config>>,
  Expect<IsEqual<ExternalHooks, typeof hooks>>,
];

/**
 * @file A module for checking the compliance of project hooks,
 * config and other parts with specified type contracts.
 */

import type {config} from '../../../../e2ed/config';
import type * as hooks from '../../../../e2ed/hooks';

import type {Expect, IsEqual} from '../checks';
import type {UserlandConfig} from '../config';

import type {ExpectedHooks} from './expectedHooks';

/**
 * Userland types checks in the e2ed directory of the project.
 */
declare type UserlandTypesChecks = [
  Expect<IsEqual<UserlandConfig, typeof config>>,
  Expect<IsEqual<ExpectedHooks, typeof hooks>>,
];

/**
 * true, if userland types are correct, false otherwise.
 */
export type UserlandTypesAreCorrect = UserlandTypesChecks extends true[] ? true : false;

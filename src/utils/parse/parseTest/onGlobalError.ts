import {throwError} from './throwError';

import type {OnGlobalError} from 'parse-statements';

import type {ParseTestContext} from '../../../types/internal';

/**
 * Adds global error of parsing source.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/max-params
export const onGlobalError: OnGlobalError<ParseTestContext> = (context, _source, message, index) =>
  throwError(context, message, index);

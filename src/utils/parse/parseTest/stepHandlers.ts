import {getLineColumnByIndex} from './getLineColumnByIndex';
import {throwError} from './throwError';

import type {OnParse} from 'parse-statements';

import type {Mutable, ParsedStep, ParseTestContext} from '../../../types/internal';

/**
 * Get handler for parsing step by kind.
 * @internal
 */
export const getOnStepParse =
  (kind: string): OnParse<ParseTestContext, 1> =>
  (context, source, {start, end}) => {
    if (context.name === undefined) {
      throwError(context, `Step "${kind}" precedes the test function`, start, end);
    }

    const lineColumn = getLineColumnByIndex(context, start);

    const step: Mutable<ParsedStep> = {
      definition: undefined,
      end,
      kind,
      start,
      ...lineColumn,
    };

    context.steps.push(step);
  };

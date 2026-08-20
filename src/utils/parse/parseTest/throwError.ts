import {getLineColumnByIndex} from './getLineColumnByIndex';
import {ParseTestError} from './ParseTestError';

import type {LineColumn, ParseTestContext} from '../../../types/internal';

const defaultStatementLength = 400;

/**
 * Throw `ParseTestError`.
 * @internal
 */
export const throwError: (
  context: ParseTestContext,
  message: string,
  start: number,
  end?: number,
  // eslint-disable-next-line @typescript-eslint/max-params
) => never = (context, message, start, end = start + defaultStatementLength) => {
  const lineColumn = getLineColumnByIndex(context, start);

  const error = new ParseTestError(message);

  Object.assign<ParseTestError, LineColumn>(error, lineColumn);

  error.source = context.source.slice(start, end);

  throw error;
};

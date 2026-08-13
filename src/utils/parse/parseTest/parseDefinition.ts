import {parseComments} from './parseComments';
import {parseStringLiteral} from './parseStringLiteral';
import {throwError} from './throwError';

import type {ParsedStep, ParseTestContext} from '../../../types/internal';

/**
 * Parses definition of step.
 * @internal
 */
export const parseDefinition = (
  context: ParseTestContext,
  step: ParsedStep,
): string | undefined => {
  const afterCommentsIndex = parseComments(step.end, context.comments, context.source);

  if (afterCommentsIndex === -1) {
    return undefined;
  }

  const unparsed = context.source.slice(afterCommentsIndex).trimStart();

  const char = unparsed[0];

  if (char !== "'" && char !== '"' && char !== '`') {
    return;
  }

  const {index, text} = parseStringLiteral(char, unparsed);

  if (index === -1) {
    throwError(context, 'Cannot find end of step definition string', step.start, step.end);
  }

  return text;
};

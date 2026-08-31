import {throwError} from './throwError';

import type {Comment, OnCommentError, OnCommentParse} from 'parse-statements';

import type {ParseTestContext} from '../../../types/internal';

/**
 * Parses comments.
 */
const onCommentParse: OnCommentParse<ParseTestContext> = (
  context,
  _source,
  {start},
  {end, token},
  // eslint-disable-next-line @typescript-eslint/max-params
) => {
  context.comments[start] = token === '' ? end + 1 : end;
};

/**
 * Throws error of parsing single quote string.
 */
const onSingleQuoteError: OnCommentError<ParseTestContext> = (context, _source, {start}) =>
  throwError(context, 'Cannot find end of string literal started with single quote', start);

/**
 * Throws error of parsing double quote string.
 */
const onDoubleQuoteError: OnCommentError<ParseTestContext> = (context, _source, {start}) =>
  throwError(context, 'Cannot find end of string literal started with double quote', start);

/**
 * Throws error of parsing backtick string.
 */
const onBacktickError: OnCommentError<ParseTestContext> = (context, _source, {start}) =>
  throwError(context, 'Cannot find end of string literal started with backtick', start);

/**
 * Throws error of parsing multiline comment.
 */
const onMultilineCommentError: OnCommentError<ParseTestContext> = (context, _source, {start}) =>
  throwError(context, 'Cannot find end of multiline comment', start);

/**
 * Throws error of parsing single line comment.
 */
const onSinglelineCommentError: OnCommentError<ParseTestContext> = (context, _source, {start}) =>
  throwError(context, 'Cannot find end of single line comment', start);

/**
 * Statements of ECMAScript comments and string literals.
 * @internal
 */
export const comments: readonly Comment<ParseTestContext>[] = [
  {
    onError: onSingleQuoteError,
    tokens: ["'", "((?<=(?:^|[^\\\\])(?:\\\\\\\\)*)')|($)"],
  },
  {
    onError: onDoubleQuoteError,
    tokens: ['"', '((?<=(?:^|[^\\\\])(?:\\\\\\\\)*)")|($)'],
  },
  {
    onError: onBacktickError,
    tokens: ['`', '(?<=(?:^|[^\\\\])(?:\\\\\\\\)*)`'],
  },
  {
    onError: onSinglelineCommentError,
    onParse: onCommentParse,
    tokens: ['\\/\\/', '$'],
  },
  {
    onError: onMultilineCommentError,
    onParse: onCommentParse,
    tokens: ['\\/\\*', '\\*\\/'],
  },
];

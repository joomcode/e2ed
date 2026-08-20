import {getLineColumnByIndex} from './getLineColumnByIndex';
import {parseOptions} from './parseOptions';
import {parseStringLiteral} from './parseStringLiteral';
import {stripComments} from './stripComments';
import {throwError} from './throwError';

import type {OnParse} from 'parse-statements';

import type {ParseTestContext} from '../../../types/internal';

/**
 * Error handler for parsing test header.
 * @internal
 */
export const onTestError: OnParse<ParseTestContext, 1> = (context, _source, {start}) => {
  throwError(context, 'Cannot find end of test definition', start);
};

/**
 * Handler for parsing test header.
 * @internal
 */
// eslint-disable-next-line complexity
export const onTestParse: OnParse<ParseTestContext, 2> = (
  context,
  source,
  {start, end: unparsedStart, comments},
  {start: unparsedEnd, end},
  // eslint-disable-next-line @typescript-eslint/max-params
) => {
  if (context.name !== undefined) {
    throwError(
      context,
      `Test file contains second test.\nFirst: "${context.name}",\n${JSON.stringify(context.options ?? {})}`,
      start,
      end,
    );
  }

  let unparsed = stripComments(source, unparsedStart, unparsedEnd, comments).trim();

  const quoteCharacter = unparsed[0];

  if (quoteCharacter !== "'" && quoteCharacter !== '"' && quoteCharacter !== '`') {
    throwError(context, 'Cannot find start of test name string', start, end);
  }

  const {index, text: name} = parseStringLiteral(quoteCharacter, unparsed);

  if (index === -1) {
    throwError(context, 'Cannot find end of test name string', start, end);
  }

  context.name = name;
  context.testLineNumber = getLineColumnByIndex(context, start).line;

  unparsed = unparsed.slice(index + 1).trimStart();

  if (unparsed[0] !== ',' || unparsed.at(-1) !== ',') {
    throwError(context, 'Incorrect list of arguments of test function', start, end);
  }

  unparsed = unparsed.slice(1, -1).trim();

  if (unparsed === '') {
    return;
  }

  if (unparsed[0] !== '{' || unparsed.at(-1) !== '}') {
    throwError(context, 'Second argument of test function is not an options object', start, end);
  }

  try {
    context.options = parseOptions(unparsed);
  } catch (error) {
    throwError(context, `Cannot parse options object: ${String(error)}`, start, end);
  }
};

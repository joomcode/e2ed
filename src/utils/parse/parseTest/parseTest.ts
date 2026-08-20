import {createParseFunction, type Parse} from 'parse-statements';

import {comments} from './comments';
import {getLinesIndexes} from './getLinesIndexes';
import {getStatements} from './getStatements';
import {onGlobalError} from './onGlobalError';
import {parseDefinition} from './parseDefinition';
import {throwError} from './throwError';

import type {ParsedTest, ParseTestContext} from '../../../types/internal';

/**
 * Cache of parse functions with different options.
 */
const parseCache = Object.create(null) as Record<string, Parse<ParseTestContext<string>>>;

/**
 * Parses source of test file.
 */
export const parseTest = <StepKind extends string>(
  source: string,
  stepTokens: Readonly<Record<StepKind, string>> = {} as unknown as Record<StepKind, string>,
): ParsedTest<StepKind> => {
  const cacheKey = JSON.stringify(stepTokens);
  const context: ParseTestContext<StepKind> = {
    comments: Object.create(null) as {},
    lineColumnCache: Object.create(null) as {},
    linesIndexes: getLinesIndexes(source),
    name: undefined,
    options: undefined,
    source,
    steps: [],
    testLineNumber: 1,
  };

  let parse: Parse<ParseTestContext<StepKind>> | undefined = parseCache[cacheKey];

  if (parse === undefined) {
    const statements = getStatements(stepTokens);

    parse = createParseFunction<ParseTestContext<StepKind>>({
      comments,
      onError: onGlobalError,
      statements,
    });

    parseCache[cacheKey] = parse as Parse<ParseTestContext<string>>;
  }

  parse(context, source);

  if (context.name === undefined) {
    throwError(context, 'Test file contains no tests', 0);
  }

  for (const step of context.steps) {
    const definition = parseDefinition(context, step);

    if (definition !== undefined) {
      step.definition = definition;
    }
  }

  const {name, options, steps, testLineNumber} = context;

  return {name, options, steps, testLineNumber};
};

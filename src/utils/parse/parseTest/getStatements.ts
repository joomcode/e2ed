import {getOnStepParse} from './stepHandlers';
import {onTestError, onTestParse} from './testHandlers';

import type {OnParse, Statement} from 'parse-statements';

import type {ObjectEntries, ParseTestContext} from '../../../types/internal';

/**
 * Get statements for parsing by step tokens.
 * @internal
 */
export const getStatements = <StepKind extends string>(
  stepTokens: Readonly<Record<StepKind, string>>,
): readonly Statement<ParseTestContext<StepKind>>[] => {
  const statements: Statement<ParseTestContext<StepKind>>[] = [
    {
      canIncludeComments: true,
      onError: onTestError as OnParse,
      onParse: onTestParse as OnParse,
      shouldSearchBeforeComments: true,
      tokens: ['^test\\(', '\\basync \\(\\) => \\{'],
    },
  ];

  for (const [kind, token] of Object.entries(stepTokens) as ObjectEntries<typeof stepTokens>) {
    statements.push({
      canIncludeComments: false,
      onParse: getOnStepParse(kind) as OnParse,
      shouldSearchBeforeComments: true,
      tokens: [token],
    });
  }

  return statements;
};

import {
  createProgram,
  flattenDiagnosticMessageText,
  getLineAndCharacterOfPosition,
  getPreEmitDiagnostics,
} from 'typescript';

import {getPathToPack} from '../environment';
import {getDurationWithUnits} from '../getDurationWithUnits';

import {getCompilerOptions} from './getCompilerOptions';

import type {UtcTimeInMs} from '../../types/internal';

type Return = Readonly<{
  compileErrors: readonly Readonly<Record<string, string>>[];
  configCompileTimeWithUnits: string;
}>;

const inNotUnderRootDir = "is not under 'rootDir'";
const unusedTsExceptErrorMessage = "Unused '@ts-expect-error' directive.";

/**
 * Compiles pack file before running tests (or tasks).
 * @internal
 */
export const compilePack = (): Return => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const {compilerOptions, parsingTsConfigError} = getCompilerOptions();
  const pathToPack = getPathToPack();

  const program = createProgram([pathToPack], compilerOptions);
  const {diagnostics} = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(diagnostics);

  const compileErrors: Readonly<Record<string, string>>[] = [];

  if (parsingTsConfigError !== undefined) {
    compileErrors.push(parsingTsConfigError);
  }

  allDiagnostics.forEach((diagnostic) => {
    const message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    if (message === unusedTsExceptErrorMessage || message.includes(inNotUnderRootDir)) {
      return;
    }

    const logData: {file?: string; message: string} = {message};

    if (diagnostic.file) {
      const {line, character} = getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start ?? 0,
      );

      logData.file = `${diagnostic.file.fileName} (${line + 1},${character + 1})`;
    }

    compileErrors.push(logData);
  });

  const configCompileTimeWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  return {compileErrors, configCompileTimeWithUnits};
};

import {
  createProgram,
  flattenDiagnosticMessageText,
  getLineAndCharacterOfPosition,
  getPreEmitDiagnostics,
} from 'typescript';

import {getPathToPack} from '../environment';

import {getCompilerOptions} from './getCompilerOptions';

const unusedTsExceptErrorMessage = "Unused '@ts-expect-error' directive.";

/**
 * Compiles pack file before running tests (or tasks).
 * @internal
 */
export const compilePack = (): readonly Readonly<Record<string, string>>[] => {
  const compilerOptions = getCompilerOptions();
  const pathToPack = getPathToPack();

  const program = createProgram([pathToPack], compilerOptions);
  const {diagnostics} = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(diagnostics);

  const errors: Readonly<Record<string, string>>[] = [];

  allDiagnostics.forEach((diagnostic) => {
    const message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    if (message === unusedTsExceptErrorMessage) {
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

    errors.push(logData);
  });

  return errors;
};

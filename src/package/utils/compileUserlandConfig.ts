import {existsSync} from 'node:fs';

import {
  createProgram,
  flattenDiagnosticMessageText,
  getLineAndCharacterOfPosition,
  getPreEmitDiagnostics,
  ModuleKind,
  ScriptTarget,
} from 'typescript';

import {
  TMP_DIRECTORY_PATH,
  USERLAND_CONFIG_PATH,
  USERLAND_OVERRIDE_CONFIG_PATH,
} from '../constants/internal';

import {generalLog} from './generalLog';

const compilerOptions = {
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  module: ModuleKind.CommonJS,
  outDir: TMP_DIRECTORY_PATH,
  resolveJsonModule: true,
  skipLibCheck: true,
  target: ScriptTarget.ESNext,
  types: ['node'],
};

/**
 * Compile userland config.ts file before running tests.
 * @internal
 */
export const compileUserlandConfig = (): void => {
  const rootNames = [USERLAND_CONFIG_PATH];

  if (existsSync(USERLAND_OVERRIDE_CONFIG_PATH)) {
    rootNames.push(USERLAND_OVERRIDE_CONFIG_PATH);
  }

  const program = createProgram(rootNames, compilerOptions);
  const {diagnostics} = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    const message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    const logData: {file?: string; message: string} = {message};

    if (diagnostic.file) {
      const {line, character} = getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start || 0,
      );

      logData.file = `${diagnostic.file.fileName} (${line + 1},${character + 1})`;
    }

    generalLog('Error on compiling config.ts', logData);
  });
};

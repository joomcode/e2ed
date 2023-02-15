import {
  createProgram,
  flattenDiagnosticMessageText,
  getLineAndCharacterOfPosition,
  getPreEmitDiagnostics,
  ModuleKind,
  ScriptTarget,
} from 'typescript';

import {
  AUTOTESTS_DIRECTORY_PATH,
  COMPILED_USERLAND_CONFIG_DIRECTORY,
} from '../../constants/internal';

import {getPathToPack} from '../environment';
import {generalLog} from '../generalLog';

import type {CompilerOptions} from 'typescript';

const compilerOptions: CompilerOptions = {
  allowSyntheticDefaultImports: true,
  declaration: false,
  esModuleInterop: true,
  module: ModuleKind.CommonJS,
  outDir: COMPILED_USERLAND_CONFIG_DIRECTORY,
  paths: {
    [AUTOTESTS_DIRECTORY_PATH]: [`./${AUTOTESTS_DIRECTORY_PATH}/index.ts`],
    [`${AUTOTESTS_DIRECTORY_PATH}/*`]: [`./${AUTOTESTS_DIRECTORY_PATH}/*`],
  },
  resolveJsonModule: true,
  rootDir: '.',
  skipLibCheck: true,
  target: ScriptTarget.ESNext,
  types: ['node'],
};

/**
 * Compiles pack file before running tests (or tasks).
 * @internal
 */
export const compilePack = (): void => {
  const pathToPack = getPathToPack();

  const program = createProgram([pathToPack], compilerOptions);
  const {diagnostics} = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    const message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    const logData: {file?: string; message: string} = {message};

    if (diagnostic.file) {
      const {line, character} = getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start ?? 0,
      );

      logData.file = `${diagnostic.file.fileName} (${line + 1},${character + 1})`;
    }

    generalLog(`Error on compiling pack ${pathToPack}`, logData);
  });
};

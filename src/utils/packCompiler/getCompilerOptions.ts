import {join} from 'node:path';

import {
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  AUTOTESTS_DIRECTORY_PATH,
  COMPILED_USERLAND_CONFIG_DIRECTORY,
} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {cloneWithoutUndefinedProperties} from '../clone';
import {requireTypescript} from '../require';
import {getProjectSettings} from '../userland';

import type {CompilerOptions} from 'typescript';

type Return = Readonly<{
  compilerOptions: CompilerOptions;
  parsingTsConfigError?: Readonly<Record<string, string>> | undefined;
}>;

/**
 * Get TypeScript compiler options for pack config compilation.
 * @internal
 */
export const getCompilerOptions = (): Return => {
  const typescript = requireTypescript();

  const {ModuleKind, ScriptTarget} = typescript;

  const frozenCompilerOptions: CompilerOptions = {
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
    target: ScriptTarget.ES2024,
    types: ['node'],
  };

  let parsingTsConfigError: Record<string, string> | undefined;
  let tsConfigOfProject: Readonly<{compilerOptions: CompilerOptions}> = {compilerOptions: {}};

  const {pathToTsConfigFromRoot} = getProjectSettings();

  try {
    assertValueIsDefined(pathToTsConfigFromRoot, 'pathToTsConfigFromRoot is defined');

    const absoluteTsConfigPath = join(
      ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
      pathToTsConfigFromRoot,
    );

    // eslint-disable-next-line global-require, import/no-dynamic-require
    tsConfigOfProject = require<typeof tsConfigOfProject>(absoluteTsConfigPath);
  } catch (error: unknown) {
    parsingTsConfigError = {
      error: String(error),
      message: 'Caught an error on parsing TypeScript config of project',
    };

    if (error instanceof Error) {
      Object.assign(parsingTsConfigError, {stack: error.stack});
    }
  }

  const compilerOptions: CompilerOptions = {...frozenCompilerOptions};
  const {baseUrl, lib, paths} = tsConfigOfProject.compilerOptions;

  Object.assign(compilerOptions, cloneWithoutUndefinedProperties({baseUrl, paths}));

  if (lib) {
    compilerOptions.lib = lib.map((name) => `lib.${name.toLowerCase()}.d.ts`);
  }

  return {compilerOptions, parsingTsConfigError};
};

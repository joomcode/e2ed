import {join} from 'node:path';

import {type CompilerOptions, ModuleKind, ScriptTarget} from 'typescript';

import {
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  AUTOTESTS_DIRECTORY_PATH,
  COMPILED_USERLAND_CONFIG_DIRECTORY,
  e2edEnvironment,
} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {cloneWithoutUndefinedProperties} from '../clone';

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
  target: ScriptTarget.ESNext,
  types: ['node'],
};

/**
 * Get TypeScript compiler options for pack config compilation.
 * @internal
 */
export const getCompilerOptions = (): CompilerOptions => {
  let tsConfigOfProject: Readonly<{compilerOptions: CompilerOptions}> = {compilerOptions: {}};

  const pathToTsConfigOfProjectFromRoot =
    e2edEnvironment.E2ED_PATH_TO_TS_CONFIG_OF_PROJECT_FROM_ROOT;

  try {
    assertValueIsDefined(
      pathToTsConfigOfProjectFromRoot,
      'pathToTsConfigOfProjectFromRoot is defined',
    );

    const absoluteTsConfigPath = join(
      ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
      pathToTsConfigOfProjectFromRoot,
    );

    // eslint-disable-next-line global-require, import/no-dynamic-require
    tsConfigOfProject = require<typeof tsConfigOfProject>(absoluteTsConfigPath);
  } catch {}

  const compilerOptions: CompilerOptions = {...frozenCompilerOptions};
  const {jsx, lib, paths, target} = tsConfigOfProject.compilerOptions;

  Object.assign(compilerOptions, cloneWithoutUndefinedProperties({jsx, lib, paths, target}));

  return compilerOptions;
};

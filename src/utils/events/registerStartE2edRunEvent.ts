import {RunEnvironment} from '../../configurator';
import {EVENTS_DIRECTORY_PATH, ExitCode, TMP_DIRECTORY_PATH} from '../../constants/internal';

import {getFullPackConfig, updateConfig} from '../config';
import {E2edError} from '../error';
import {setGlobalExitCode} from '../exit';
import {createDirectory, removeDirectory, writeStartInfo} from '../fs';
import {generalLog, writeLogsToFile} from '../generalLog';
import {compilePack, setPackTimeout} from '../pack';
import {getStartInfo} from '../startInfo';

import {runBeforePackFunctions} from './runBeforePackFunctions';

/**
 * Register start e2ed run event (for report) before running any test.
 * @internal
 */
export const registerStartE2edRunEvent = async (): Promise<void> => {
  await removeDirectory(TMP_DIRECTORY_PATH);
  await createDirectory(EVENTS_DIRECTORY_PATH);

  compilePack();

  const startInfo = getStartInfo();

  try {
    await runBeforePackFunctions(startInfo);
  } catch (cause) {
    setGlobalExitCode(ExitCode.HasErrorsInDoBeforePackFunctions);

    throw new E2edError('Caught an error on running "before pack" functions', {cause});
  }

  const fullPackConfig = getFullPackConfig();

  updateConfig(fullPackConfig, startInfo);

  const {e2ed, runEnvironment} = startInfo;
  const isDockerRun = runEnvironment === RunEnvironment.Docker;
  const startMessage = `Run tests ${isDockerRun ? 'in docker' : 'local'} with e2ed@${e2ed.version}`;

  generalLog(startMessage, startInfo);

  await writeStartInfo(startInfo);
  await writeLogsToFile();

  setPackTimeout();
};

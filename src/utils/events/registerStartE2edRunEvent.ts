import {RunEnvironment} from '../../configurator';
import {EVENTS_DIRECTORY_PATH, TMP_DIRECTORY_PATH} from '../../constants/internal';

import {createDirectory, removeDirectory, writeStartInfo} from '../fs';
import {generalLog} from '../generalLog';
import {compilePack, setPackTimeout} from '../pack';
import {getStartInfo} from '../startInfo';

/**
 * Register start e2ed run event (for report) before running any test.
 * @internal
 */
export const registerStartE2edRunEvent = async (): Promise<void> => {
  await removeDirectory(TMP_DIRECTORY_PATH);
  await createDirectory(EVENTS_DIRECTORY_PATH);

  compilePack();

  const startInfo = getStartInfo();

  const {e2ed, runEnvironment} = startInfo;
  const isDockerRun = runEnvironment === RunEnvironment.Docker;
  const startMessage = `Run tests ${isDockerRun ? 'in docker' : 'local'} with e2ed@${e2ed.version}`;

  generalLog(startMessage, startInfo);

  await writeStartInfo(startInfo);

  setPackTimeout();
};

import {RunEnvironment} from '../../configurator';
import {EVENTS_DIRECTORY_PATH, TMP_DIRECTORY_PATH} from '../../constants/internal';

import {compileUserlandConfig} from '../compileUserlandConfig';
import {createDirectory, removeDirectory} from '../fs';
import {generalLog} from '../generalLog';
import {setFullStartInfo} from '../getAndSetFullStartInfo';
import {getStartInfo} from '../getStartInfo';

import type {E2edRunEvent} from '../../types/internal';

/**
 * Register start e2ed run event (for report) before running any test.
 * @internal
 */
export const registerStartE2edRunEvent = async (e2edRunEvent: E2edRunEvent): Promise<void> => {
  await removeDirectory(TMP_DIRECTORY_PATH);
  await createDirectory(EVENTS_DIRECTORY_PATH);

  compileUserlandConfig();

  const startInfo = getStartInfo();
  const fullStartInfo = {...startInfo, ...e2edRunEvent};

  const {e2edVersion, runEnvironment} = fullStartInfo;
  const isDockerRun = runEnvironment === RunEnvironment.Docker;
  const startMessage = `Run tests ${isDockerRun ? 'in docker' : 'local'} with e2ed@${e2edVersion}`;

  generalLog(startMessage, fullStartInfo);

  setFullStartInfo(fullStartInfo);
};

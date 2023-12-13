import {generalLog} from '../generalLog';
import {runArrayOfUserlandFunctions} from '../userland';

import type {
  FullPackConfig,
  FullPackConfigWithoutDoBeforePack,
  StartInfo,
  Void,
} from '../../types/internal';

/**
 * Runs functions from `doBeforePack` pack config field.
 * @internal
 */
export const runBeforePackFunctions = async (startInfo: StartInfo): Promise<void> => {
  type StartInfoWithoutDoBeforePack = StartInfo<FullPackConfigWithoutDoBeforePack>;

  const {fullPackConfig} = startInfo;
  const {doBeforePack: functions, ...fullPackConfigWithoutDoBeforePack} = fullPackConfig;

  Object.assign<StartInfoWithoutDoBeforePack, Partial<StartInfoWithoutDoBeforePack>>(startInfo, {
    fullPackConfig: fullPackConfigWithoutDoBeforePack,
  });

  const args: [StartInfoWithoutDoBeforePack] = [startInfo];

  const processCurrentFunctionResult = (result: FullPackConfigWithoutDoBeforePack | Void): void => {
    if (result === undefined) {
      return;
    }

    Object.assign<StartInfoWithoutDoBeforePack, Partial<StartInfoWithoutDoBeforePack>>(startInfo, {
      fullPackConfig: result,
    });
  };

  const message =
    functions.length > 0
      ? `Will be run ${functions.length} before pack function${functions.length > 1 ? 's' : ''}`
      : 'There are no before pack functions';

  generalLog(message);

  await runArrayOfUserlandFunctions(functions, () => args, processCurrentFunctionResult);

  Object.assign<FullPackConfigWithoutDoBeforePack, Partial<FullPackConfig>>(
    startInfo.fullPackConfig,
    {doBeforePack: functions},
  );
};

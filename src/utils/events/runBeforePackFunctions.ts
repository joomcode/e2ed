import {runArrayOfFunctionsSafely} from '../runArrayOfFunctionsSafely';

import type {
  FullPackConfig,
  FullPackConfigWithoutDoBeforePack,
  StartInfo,
  Void,
} from '../../types/internal';

/**
 * Run functions from `doBeforePack` pack config property.
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

  await runArrayOfFunctionsSafely(functions, () => args, processCurrentFunctionResult);

  Object.assign<FullPackConfigWithoutDoBeforePack, Partial<FullPackConfig>>(
    startInfo.fullPackConfig,
    {doBeforePack: functions},
  );
};

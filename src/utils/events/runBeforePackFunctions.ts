import {generalLog} from '../generalLog';
import {setReadonlyProperty} from '../setReadonlyProperty';
import {runArrayOfUserlandFunctions} from '../userland';

import type {FullPackConfigWithoutDoBeforePack, StartInfo, Void} from '../../types/internal';

/**
 * Runs functions from `doBeforePack` pack config field.
 * @internal
 */
export const runBeforePackFunctions = async (startInfo: StartInfo): Promise<void> => {
  type StartInfoWithoutDoBeforePack = StartInfo<FullPackConfigWithoutDoBeforePack>;

  const {fullPackConfig} = startInfo;
  const {doBeforePack: functions, ...fullPackConfigWithoutDoBeforePack} = fullPackConfig;

  setReadonlyProperty(
    startInfo as StartInfoWithoutDoBeforePack,
    'fullPackConfig',
    fullPackConfigWithoutDoBeforePack,
  );

  const args: [StartInfoWithoutDoBeforePack] = [startInfo];

  const processCurrentFunctionResult = (result: FullPackConfigWithoutDoBeforePack | Void): void => {
    if (result === undefined) {
      return;
    }

    setReadonlyProperty(startInfo as StartInfoWithoutDoBeforePack, 'fullPackConfig', result);
  };

  const functionNames = functions.map(({name}) => name || 'anonymous').join(', ');
  const message =
    functions.length > 0
      ? `Will be run ${functions.length} before pack function${functions.length > 1 ? 's' : ''} (${functionNames})`
      : 'There are no before pack functions';

  generalLog(message);

  const beforePackExecutionTimeWithUnits = await runArrayOfUserlandFunctions(
    functions,
    () => args,
    processCurrentFunctionResult,
  );

  setReadonlyProperty(
    startInfo,
    'beforePackExecutionTimeWithUnits',
    beforePackExecutionTimeWithUnits,
  );

  setReadonlyProperty(startInfo.fullPackConfig, 'doBeforePack', functions);
};

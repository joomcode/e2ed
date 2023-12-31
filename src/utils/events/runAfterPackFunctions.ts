import {getFullPackConfig} from '../config';
import {generalLog} from '../generalLog';
import {runArrayOfUserlandFunctions} from '../userland';

import type {CustomReportPropertiesPlaceholder, LiteReport, Void} from '../../types/internal';

/**
 * Runs functions from `doAfterPack` pack config field.
 * @internal
 */
export const runAfterPackFunctions = async (liteReport: LiteReport): Promise<void> => {
  const {doAfterPack: functions} = getFullPackConfig();
  const args: [LiteReport] = [liteReport];

  const processCurrentFunctionResult = (result: CustomReportPropertiesPlaceholder | Void): void => {
    if (result === undefined) {
      return;
    }

    Object.assign<LiteReport, Partial<LiteReport>>(liteReport, {customReportProperties: result});
  };

  const message =
    functions.length > 0
      ? `Will be run ${functions.length} after pack function${functions.length > 1 ? 's' : ''}`
      : 'There are no after pack functions';

  generalLog(message);

  await runArrayOfUserlandFunctions(functions, () => args, processCurrentFunctionResult);
};

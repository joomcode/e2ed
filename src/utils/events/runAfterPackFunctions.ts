import {runArrayOfFunctionsSafely} from '../fn';
import {getFullPackConfig} from '../getFullPackConfig';

import type {CustomReportPropertiesPlaceholder, LiteReport, Void} from '../../types/internal';

/**
 * Run functions from `doAfterPack` pack config property.
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

  await runArrayOfFunctionsSafely(functions, () => args, processCurrentFunctionResult);
};

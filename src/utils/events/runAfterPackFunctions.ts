import {getFullPackConfig} from '../getFullPackConfig';
import {runArrayOfFunctionsSafely} from '../runArrayOfFunctionsSafely';

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

  await runArrayOfFunctionsSafely(functions, () => args, processCurrentFunctionResult);
};

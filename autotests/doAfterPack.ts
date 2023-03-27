import type {DoAfterPack} from 'autotests/types/packSpecific';

/**
 * An array of functions that will be run after the pack.
 * This is an implementation for internal tests. You must remove it from your project.
 */
export const doAfterPack: readonly DoAfterPack[] = [
  ({endTimeInMs}) => ({externalPackRunId: endTimeInMs}),
  ({customReportProperties}) => ({
    externalPackRunId: customReportProperties ? customReportProperties.externalPackRunId + 1 : 0,
  }),
  ({customReportProperties, endTimeInMs, startInfo}) => {
    if (!(startInfo.fullPackConfig.customPackProperties.internalPackRunId > 0)) {
      throw new Error('Custom pack properties were calculated incorrectly');
    }

    if (customReportProperties?.externalPackRunId !== Number(endTimeInMs) + 1) {
      throw new Error('Custom report properties were calculated incorrectly');
    }
  },
];

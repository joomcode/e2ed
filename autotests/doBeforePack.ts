import type {DoBeforePack} from 'autotests/types/packSpecific';

/**
 * An array of functions that will be run before the pack.
 * This is an implementation for internal tests. You must remove it from your project.
 */
export const doBeforePack: readonly DoBeforePack[] = [
  ({fullPackConfig, startTimeInMs}) => ({
    ...fullPackConfig,
    customPackProperties: {
      ...fullPackConfig.customPackProperties,
      internalPackRunId: startTimeInMs,
    },
  }),
  ({fullPackConfig}) => ({
    ...fullPackConfig,
    customPackProperties: {
      ...fullPackConfig.customPackProperties,
      internalPackRunId: fullPackConfig.customPackProperties.internalPackRunId + 1,
    },
  }),
  ({fullPackConfig, startTimeInMs}) => {
    if (fullPackConfig.customPackProperties.internalPackRunId !== startTimeInMs + 1) {
      throw new Error('Custom pack properties were calculated incorrectly');
    }
  },
];

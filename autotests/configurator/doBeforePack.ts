import type {DoBeforePack} from 'autotests/configurator';

const setInternalPackRunId: DoBeforePack = ({fullPackConfig, startTimeInMs}) => ({
  ...fullPackConfig,
  customPackProperties: {
    ...fullPackConfig.customPackProperties,
    internalPackRunId: startTimeInMs,
  },
});

const incrementInternalPackRunId: DoBeforePack = ({fullPackConfig}) => ({
  ...fullPackConfig,
  customPackProperties: {
    ...fullPackConfig.customPackProperties,
    internalPackRunId: fullPackConfig.customPackProperties.internalPackRunId + 1,
  },
});

const assertInternalPackRunId: DoBeforePack = ({fullPackConfig, startTimeInMs}) => {
  if (fullPackConfig.customPackProperties.internalPackRunId !== Number(startTimeInMs) + 1) {
    throw new Error('Custom pack properties were calculated incorrectly');
  }
};

/**
 * An array of functions that will be run before the pack.
 * This is an implementation for internal tests. You must remove it from your project.
 */
export const doBeforePack = [
  setInternalPackRunId,
  incrementInternalPackRunId,
  assertInternalPackRunId,
];

import {getKeys} from '../object';

import type {FullPackConfig, StartInfo} from '../../types/internal';

const skippedFields: readonly (keyof FullPackConfig)[] = [
  'doAfterPack',
  'doBeforePack',
  'fullMocks',
  'matchScreenshot',
];

/**
 * Updates full pack config by values from `startInfo` (getted by `doBeforePack` functions).
 * @internal
 */
export const updateConfig = (fullPackConfig: FullPackConfig, startInfo: StartInfo): void => {
  for (const field of new Set([...getKeys(fullPackConfig), ...getKeys(startInfo.fullPackConfig)])) {
    if (skippedFields.includes(field)) {
      continue;
    }

    if (typeof fullPackConfig[field] === 'function') {
      continue;
    }

    // @ts-expect-error: full pack config have different types of field values
    fullPackConfig[field] = startInfo.fullPackConfig[field]; // eslint-disable-line no-param-reassign
  }

  Object.assign(fullPackConfig, {
    ...fullPackConfig.overriddenConfigFields,
    use: {...fullPackConfig.use, ...fullPackConfig.overriddenConfigFields?.use},
  });
};

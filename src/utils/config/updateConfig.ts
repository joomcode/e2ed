import type {FullPackConfig, StartInfo} from '../../types/internal';

/**
 * Updates full pack config by values from `startInfo` (getted by `doBeforePack` functions).
 * @internal
 */
export const updateConfig = (fullPackConfig: FullPackConfig, startInfo: StartInfo): void => {
  for (const field of Object.keys(fullPackConfig) as (keyof FullPackConfig)[]) {
    if (field === 'doAfterPack' || field === 'doBeforePack' || field === 'fullMocks') {
      continue;
    }

    if (typeof fullPackConfig[field] === 'function') {
      continue;
    }

    // @ts-expect-error: full pack config have different types of field values
    fullPackConfig[field] = startInfo.fullPackConfig[field]; // eslint-disable-line no-param-reassign
  }
};

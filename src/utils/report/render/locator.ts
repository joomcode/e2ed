import {createSimpleLocator} from 'create-locator';

import {attributesOptions, e2edEnvironment} from '../../../constants/internal';

const isProduction = e2edEnvironment.E2ED_ORIGIN !== 'https://google.com';

/**
 * `locator` function.
 */
export const locator = createSimpleLocator({attributesOptions, isProduction});

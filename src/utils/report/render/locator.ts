import {type CreateLocatorOptions, createSimpleLocator, type LocatorFunction} from 'create-locator';

import {attributesOptions, e2edEnvironment} from '../../../constants/internal';

const isProduction = e2edEnvironment.E2ED_ORIGIN !== 'https://bing.com';

export const createLocatorOptions: CreateLocatorOptions = {attributesOptions, isProduction};

export const locator: LocatorFunction = createSimpleLocator(createLocatorOptions).locator;

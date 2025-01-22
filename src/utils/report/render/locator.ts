import {type CreateLocatorOptions, createSimpleLocator, type LocatorFunction} from 'create-locator';

import {attributesOptions, e2edEnvironment} from '../../../constants/internal';

import {renderAttributes} from '../client';

import type {SafeHtml} from '../../../types/internal';

const isProduction = e2edEnvironment.E2ED_ORIGIN !== 'https://bing.com';

const createLocatorOptions: CreateLocatorOptions = {attributesOptions, isProduction};

const {locator: locatorAttributes} = createSimpleLocator(createLocatorOptions);

export {createLocatorOptions};

/**
 * `locator` function.
 * @internal
 */
export const locator: LocatorFunction<SafeHtml> = (...args): SafeHtml =>
  renderAttributes(locatorAttributes(...(args as [string])));

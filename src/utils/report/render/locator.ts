import {type CreateLocatorOptions, createSimpleLocator, type LocatorFunction} from 'create-locator';

import {attributesOptions, e2edEnvironment} from '../../../constants/internal';

import {renderAttributes} from '../client';

import type {SafeHtml} from '../../../types/internal';

const isProduction = e2edEnvironment.E2ED_ORIGIN !== 'https://bing.com';

const createLocatorOptions: CreateLocatorOptions = {attributesOptions, isProduction};

export const locator: LocatorFunction = createSimpleLocator(createLocatorOptions).locator;

export {createLocatorOptions};

/**
 * `locator` function.
 * @internal
 */
export const locatorAttributes: LocatorFunction<SafeHtml> = (...args): SafeHtml =>
  renderAttributes(locator(...(args as [string])));

import {createSelector} from '../createSelector';

import type {Selector} from '../types/internal';

/**
 * Selector of locator elements (with data-test attribute) by locator property and its value.
 * Selects elements whose property ends with a value.
 */
export const locatorPropertyEndsWithSelector = (property: string, value: string): Selector =>
  createSelector(`[data-test-${property}$='${value}']`);

/**
 * Selector of locator elements (with data-test attribute) by locator property and its value.
 * Selects elements whose property includes a value.
 */
export const locatorPropertyIncludesSelector = (property: string, value: string): Selector =>
  createSelector(`[data-test-${property}*='${value}']`);

/**
 * Selector of locator elements (with data-test attribute) by locator property and its value.
 * Selects elements that have a property that is exactly equal to the value.
 */
export const locatorPropertySelector = (property: string, value: string): Selector =>
  createSelector(`[data-test-${property}='${value}']`);

/**
 * Selector of locator elements (with data-test attribute) by locator property and its value.
 * Selects elements whose property starts with a value.
 */
export const locatorPropertyStartsWithSelector = (property: string, value: string): Selector =>
  createSelector(`[data-test-${property}^='${value}']`);

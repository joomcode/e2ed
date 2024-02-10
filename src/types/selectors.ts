import type {Inner} from 'testcafe-without-typecheck';

import type {DESCRIPTION_KEY} from '../constants/internal';

import type {TestCafeSelector} from './testCafe';

type ReplaceSelector<Type> = Type extends TestCafeSelector ? Selector : Type;

type ReplaceObjectSelectors<Obj extends object> = Readonly<{
  // check overloads, Selector methods has up to 4
  [Key in keyof Obj]: Obj[Key] extends {
    (...args: infer A1): infer R1;
    (...args: infer A2): infer R2;
    (...args: infer A3): infer R3;
    (...args: infer A4): infer R4;
  }
    ? {
        (...args: A4): ReplaceSelector<R4>;
        (...args: A3): ReplaceSelector<R3>;
        (...args: A2): ReplaceSelector<R2>;
        (...args: A1): ReplaceSelector<R1>;
      }
    : Obj[Key] extends {
          (...args: infer A1): infer R1;
          (...args: infer A2): infer R2;
          (...args: infer A3): infer R3;
        }
      ? {
          (...args: A3): ReplaceSelector<R3>;
          (...args: A2): ReplaceSelector<R2>;
          (...args: A1): ReplaceSelector<R1>;
        }
      : Obj[Key] extends {
            (...args: infer A1): infer R1;
            (...args: infer A2): infer R2;
          }
        ? {
            (...args: A2): ReplaceSelector<R2>;
            (...args: A1): ReplaceSelector<R1>;
          }
        : Obj[Key] extends {
              (...args: infer A1): infer R1;
            }
          ? {
              (...args: A1): ReplaceSelector<R1>;
            }
          : Obj[Key];
}>;

/**
 * Options of `createSelectorFunctions` function.
 */
export type CreateSelectorFunctionsOptions = Readonly<{
  getLocatorAttributeName: GetLocatorAttributeNameFn;
}>;

/**
 * Type of `getLocatorAttributeName` function.
 */
export type GetLocatorAttributeNameFn = (this: void, parameter: string) => string;

/**
 * Creates selector by locator and optional parameters.
 */
export type CreateSelector = (this: void, ...args: Parameters<Inner.SelectorFactory>) => Selector;

/**
 * Type of `createSelectorByCss` function.
 */
export type CreateSelectorByCss = (this: void, cssSelectorString: string) => Selector;

/**
 * Type of `locatorIdSelector` function.
 */
export type LocatorIdSelector = (this: void, id: string) => Selector;

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = ReplaceObjectSelectors<Inner.SelectorAPI> &
  ReplaceObjectSelectors<SelectorCustomMethods> &
  Readonly<{[DESCRIPTION_KEY]?: string}>;

/**
 * Custom methods that `e2ed` adds to selector.
 */
export type SelectorCustomMethods = Readonly<{
  /* eslint-disable typescript-sort-keys/interface */

  /** Creates a selector that filters a matching set by locatorId. */
  filterByLocatorId(this: TestCafeSelector, locatorId: string): TestCafeSelector;
  /** Finds all descendants of all nodes in the matching set and filters them by locatorId. */
  findByLocatorId(this: TestCafeSelector, locatorId: string): TestCafeSelector;
  /** Finds all parents of all nodes in the matching set and filters them by locatorId. */
  parentByLocatorId(this: TestCafeSelector, locatorId: string): TestCafeSelector;
  /** Finds all child elements (not nodes) of all nodes in the matching set and filters them by locatorId. */
  childByLocatorId(this: TestCafeSelector, locatorId: string): TestCafeSelector;
  /** Finds all sibling elements (not nodes) of all nodes in the matching set and filters them by locatorId. */
  siblingByLocatorId(this: TestCafeSelector, locatorId: string): TestCafeSelector;
  /** Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by locatorId. */
  nextSiblingByLocatorId(this: TestCafeSelector, locatorId: string): TestCafeSelector;
  /** Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by locatorId. */
  prevSiblingByLocatorId(this: TestCafeSelector, locatorId: string): TestCafeSelector;

  /** Creates a selector that filters a matching set by locator parameter. */
  filterByLocatorParameter(
    this: TestCafeSelector,
    parameter: string,
    value: string,
  ): TestCafeSelector;
  /** Finds all descendants of all nodes in the matching set and filters them by locator parameter. */
  findByLocatorParameter(
    this: TestCafeSelector,
    parameter: string,
    value: string,
  ): TestCafeSelector;
  /** Finds all parents of all nodes in the matching set and filters them by locator parameter. */
  parentByLocatorParameter(
    this: TestCafeSelector,
    parameter: string,
    value: string,
  ): TestCafeSelector;
  /** Finds all child elements (not nodes) of all nodes in the matching set and filters them by locator parameter. */
  childByLocatorParameter(
    this: TestCafeSelector,
    parameter: string,
    value: string,
  ): TestCafeSelector;
  /** Finds all sibling elements (not nodes) of all nodes in the matching set and filters them by locator parameter. */
  siblingByLocatorParameter(
    this: TestCafeSelector,
    parameter: string,
    value: string,
  ): TestCafeSelector;
  /** Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by locator parameter. */
  nextSiblingByLocatorParameter(
    this: TestCafeSelector,
    parameter: string,
    value: string,
  ): TestCafeSelector;
  /** Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by locator parameter. */
  prevSiblingByLocatorParameter(
    this: TestCafeSelector,
    parameter: string,
    value: string,
  ): TestCafeSelector;

  /** Returns the value of the locator id. */
  getLocatorId(this: TestCafeSelector): Promise<string | null>;
  /** true if the element has the locator id. */
  hasLocatorId(this: TestCafeSelector): Promise<boolean>;
  /** Returns the value of the locator parameter. */
  getLocatorParameter(this: TestCafeSelector, parameter: string): Promise<string | null>;
  /** true if the element has the locator parameter. */
  hasLocatorParameter(this: TestCafeSelector, parameter: string): Promise<boolean>;

  /** Get string description of selector if any. */
  getDescription(this: TestCafeSelector): string | undefined;

  /* eslint-enable typescript-sort-keys/interface */
}>;

/**
 * Object with main functions for creating selectors and working with selectors.
 */
export type SelectorFunctions = Readonly<{
  createSelector: CreateSelector;
  createSelectorByCss: CreateSelectorByCss;
  htmlElementSelector: Selector;
  locatorIdSelector: LocatorIdSelector;
}>;

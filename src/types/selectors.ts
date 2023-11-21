import type {Inner, Selector as TestCafeSelector} from 'testcafe-without-typecheck';

import type {DESCRIPTION_KEY} from '../constants/internal';

type ReplaceSelector<Type> = Type extends Inner.Selector ? Selector : Type;

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

export type GetLocatorAttributeNameFn = (this: void, parameter: string) => string;

export type CreateSelectorsOptions = Readonly<{
  getLocatorAttributeName: GetLocatorAttributeNameFn;
}>;

export type SelectorCustomMethods = Readonly<{
  /** Creates a selector that filters a matching set by locatorId. */
  filterByLocatorId(this: Inner.Selector, locatorId: string): Inner.Selector;
  /** Finds all descendants of all nodes in the matching set and filters them by locatorId. */
  findByLocatorId(this: Inner.Selector, locatorId: string): Inner.Selector;
  /** Finds all parents of all nodes in the matching set and filters them by locatorId. */
  parentByLocatorId(this: Inner.Selector, locatorId: string): Inner.Selector;
  /** Finds all child elements (not nodes) of all nodes in the matching set and filters them by locatorId. */
  childByLocatorId(this: Inner.Selector, locatorId: string): Inner.Selector;
  /** Finds all sibling elements (not nodes) of all nodes in the matching set and filters them by locatorId. */
  siblingByLocatorId(this: Inner.Selector, locatorId: string): Inner.Selector;
  /** Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by locatorId. */
  nextSiblingByLocatorId(this: Inner.Selector, locatorId: string): Inner.Selector;
  /** Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by locatorId. */
  prevSiblingByLocatorId(this: Inner.Selector, locatorId: string): Inner.Selector;

  /** Creates a selector that filters a matching set by locator parameter. */
  filterByLocatorParameter(this: Inner.Selector, parameter: string, value: string): Inner.Selector;
  /** Finds all descendants of all nodes in the matching set and filters them by locator parameter. */
  findByLocatorParameter(this: Inner.Selector, parameter: string, value: string): Inner.Selector;
  /** Finds all parents of all nodes in the matching set and filters them by locator parameter. */
  parentByLocatorParameter(this: Inner.Selector, parameter: string, value: string): Inner.Selector;
  /** Finds all child elements (not nodes) of all nodes in the matching set and filters them by locator parameter. */
  childByLocatorParameter(this: Inner.Selector, parameter: string, value: string): Inner.Selector;
  /** Finds all sibling elements (not nodes) of all nodes in the matching set and filters them by locator parameter. */
  siblingByLocatorParameter(this: Inner.Selector, parameter: string, value: string): Inner.Selector;
  /** Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by locator parameter. */
  nextSiblingByLocatorParameter(
    this: Inner.Selector,
    parameter: string,
    value: string,
  ): Inner.Selector;
  /** Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by locator parameter. */
  prevSiblingByLocatorParameter(
    this: Inner.Selector,
    parameter: string,
    value: string,
  ): Inner.Selector;

  /** Returns the value of the locator id. */
  getLocatorId(this: Inner.Selector): Promise<string | null>;
  /** Returns the value of the locator parameter. */
  getLocatorParameter(this: Inner.Selector, parameter: string): Promise<string | null>;
  /** true if the element has the locator parameter. */
  hasLocatorParameter(this: Inner.Selector, parameter: string): Promise<boolean>;

  /** Get string description of selector if any. */
  getDescription(this: Inner.Selector): string | undefined;
}>;

export type CreateSelector = (this: void, ...args: Parameters<typeof TestCafeSelector>) => Selector;

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = ((this: void, ...args: unknown[]) => Inner.SelectorPromise) &
  ReplaceObjectSelectors<Inner.SelectorAPI> &
  ReplaceObjectSelectors<SelectorCustomMethods> &
  Readonly<{[DESCRIPTION_KEY]?: string}>;

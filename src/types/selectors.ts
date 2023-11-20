import type {Inner, Selector as TestcafeSelector} from 'testcafe-without-typecheck';

import type {DESCRIPTION_KEY} from '../constants/internal';

type ReplaceSelector<T, CustomMethods extends SelectorCustomMethods = {}> = T extends
  | Inner.Selector
  | RawSelector
  ? RawSelector<CustomMethods>
  : T;

type ReplaceObjectSelectors<
  Obj extends object,
  CustomMethods extends SelectorCustomMethods = {},
> = {
  // check overloads, Selector methods has up to 4
  [Key in keyof Obj]: Obj[Key] extends {
    (...args: infer A1): infer R1;
    (...args: infer A2): infer R2;
    (...args: infer A3): infer R3;
    (...args: infer A4): infer R4;
  }
    ? {
        (...args: A4): ReplaceSelector<R4, CustomMethods>;
        (...args: A3): ReplaceSelector<R3, CustomMethods>;
        (...args: A2): ReplaceSelector<R2, CustomMethods>;
        (...args: A1): ReplaceSelector<R1, CustomMethods>;
      }
    : Obj[Key] extends {
          (...args: infer A1): infer R1;
          (...args: infer A2): infer R2;
          (...args: infer A3): infer R3;
        }
      ? {
          (...args: A3): ReplaceSelector<R3, CustomMethods>;
          (...args: A2): ReplaceSelector<R2, CustomMethods>;
          (...args: A1): ReplaceSelector<R1, CustomMethods>;
        }
      : Obj[Key] extends {
            (...args: infer A1): infer R1;
            (...args: infer A2): infer R2;
          }
        ? {
            (...args: A2): ReplaceSelector<R2, CustomMethods>;
            (...args: A1): ReplaceSelector<R1, CustomMethods>;
          }
        : Obj[Key] extends {
              (...args: infer A1): infer R1;
            }
          ? {
              (...args: A1): ReplaceSelector<R1, CustomMethods>;
            }
          : Obj[Key];
};

export type SelectorCustomMethods = Record<
  string,
  (this: RawSelector, ...args: never[]) => unknown
>;

export type GetTestAttributeNameFn = (property: string) => string;

export type CreateSelectorsOptions = {
  getTestAttributeName: GetTestAttributeNameFn;
};

export type SelectorDefaultCustomMethods = {
  /** Creates a selector that filters a matching set by testId. */
  filterByTestId(this: RawSelector, testId: string): RawSelector;
  /** Finds all descendants of all nodes in the matching set and filters them by testId. */
  findByTestId(this: RawSelector, testId: string): RawSelector;
  /** Finds all parents of all nodes in the matching set and filters them by testId. */
  parentByTestId(this: RawSelector, testId: string): RawSelector;
  /** Finds all child elements (not nodes) of all nodes in the matching set and filters them by testId. */
  childByTestId(this: RawSelector, testId: string): RawSelector;
  /** Finds all sibling elements (not nodes) of all nodes in the matching set and filters them by testId. */
  siblingByTestId(this: RawSelector, testId: string): RawSelector;
  /** Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by testId. */
  nextSiblingByTestId(this: RawSelector, testId: string): RawSelector;
  /** Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by testId. */
  prevSiblingByTestId(this: RawSelector, testId: string): RawSelector;

  /** Creates a selector that filters a matching set by test property. */
  filterByTestProp(this: RawSelector, property: string, value: string): RawSelector;
  /** Finds all descendants of all nodes in the matching set and filters them by test property. */
  findByTestProp(this: RawSelector, property: string, value: string): RawSelector;
  /** Finds all parents of all nodes in the matching set and filters them by test property. */
  parentByTestProp(this: RawSelector, property: string, value: string): RawSelector;
  /** Finds all child elements (not nodes) of all nodes in the matching set and filters them by test property. */
  childByTestProp(this: RawSelector, property: string, value: string): RawSelector;
  /** Finds all sibling elements (not nodes) of all nodes in the matching set and filters them by test property. */
  siblingByTestProp(this: RawSelector, property: string, value: string): RawSelector;
  /** Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by test property. */
  nextSiblingByTestProp(this: RawSelector, property: string, value: string): RawSelector;
  /** Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by test property. */
  prevSiblingByTestProp(this: RawSelector, property: string, value: string): RawSelector;

  /** Returns the value of the test attribute. */
  getTestProp(this: RawSelector, property: string): Promise<string | null>;
  /** true if the element has the test attribute. */
  hasTestProp(this: RawSelector, property: string): Promise<boolean>;

  /** Get string description of selector if any. */
  getDescription(this: RawSelector): string | undefined;
};

export type CreateSelector<CustomMethods extends SelectorCustomMethods = {}> = (
  ...args: Parameters<typeof TestcafeSelector>
) => RawSelector<CustomMethods>;

export type RawSelector<CustomMethods extends SelectorCustomMethods = {}> = ((
  ...args: unknown[]
) => Inner.SelectorPromise) &
  ReplaceObjectSelectors<Inner.SelectorAPI, CustomMethods> &
  ReplaceObjectSelectors<CustomMethods, CustomMethods> & {
    [DESCRIPTION_KEY]?: string;
  };

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = RawSelector<SelectorDefaultCustomMethods>;

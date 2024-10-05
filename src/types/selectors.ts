import type {DESCRIPTION_KEY} from '../constants/internal';
// eslint-disable-next-line import/no-internal-modules
import type {Selector as SelectorClass} from '../utils/selectors/Selector';

type ReplaceSelector<Type> = Type extends SelectorClass ? Selector : Type;

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
        : Obj[Key] extends (...args: infer A1) => infer R1
          ? (...args: A1) => ReplaceSelector<R1>
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
export type CreateSelector = (this: void, cssString: string) => Selector;

/**
 * Type of `createSelectorByCss` function.
 */
export type CreateSelectorByCss = (this: void, cssSelectorString: string) => Selector;

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = ReplaceObjectSelectors<SelectorClass> &
  ReplaceObjectSelectors<SelectorCustomMethods> &
  Readonly<{[DESCRIPTION_KEY]?: string}>;

/**
 * Custom methods that `e2ed` adds to selector.
 */
export type SelectorCustomMethods = Readonly<{
  /** Creates a selector that filters a matching set by locatorId. */
  filterByLocatorId: (this: SelectorClass, locatorId: string) => SelectorClass;

  /** Creates a selector that filters a matching set by locator parameter. */
  filterByLocatorParameter: (
    this: SelectorClass,
    parameter: string,
    value: string,
  ) => SelectorClass;

  /** Finds all descendants of all nodes in the matching set and filters them by locatorId. */
  findByLocatorId: (this: SelectorClass, locatorId: string) => SelectorClass;

  /** Finds all descendants of all nodes in the matching set and filters them by locator parameter. */
  findByLocatorParameter: (this: SelectorClass, parameter: string, value: string) => SelectorClass;

  /** Get string description of selector if any. */
  getDescription: (this: SelectorClass) => string | undefined;

  /** Returns the value of the locator id. */
  getLocatorId: (this: SelectorClass) => Promise<string | null>;

  /** Returns the value of the locator parameter. */
  getLocatorParameter: (this: SelectorClass, parameter: string) => Promise<string | null>;

  /** true if the element has the locator id. */
  hasLocatorId: (this: SelectorClass) => Promise<boolean>;

  /** true if the element has the locator parameter. */
  hasLocatorParameter: (this: SelectorClass, parameter: string) => Promise<boolean>;
}>;

/**
 * Object with main functions for creating selectors and working with selectors.
 */
export type SelectorFunctions = Readonly<{
  createSelector: CreateSelector;
  createSelectorByCss: CreateSelectorByCss;
  htmlElementSelector: Selector;
}>;

/**
 * Data for retrying property of Selector.
 * @internal
 */
export type SelectorPropertyRetryData = Readonly<{
  args?: readonly string[];
  property: string;
  selector: Selector;
}>;

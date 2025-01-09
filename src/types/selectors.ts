import type {DESCRIPTION_KEY} from '../constants/internal';
import type {AttributesOptions} from '../createLocator';
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
 * Options of `createSelectorFunction` function.
 */
export type CreateSelectorFunctionOptions = AttributesOptions;

/**
 * Creates selector by locator and optional parameters.
 */
export type CreateSelector = (this: void, cssString: string) => Selector;

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
  /** Creates a selector that filters a matching set by locator parameter. */
  filterByLocatorParameter: (
    this: SelectorClass,
    parameter: string,
    value: string,
  ) => SelectorClass;

  /** Creates a selector that filters a matching set by testId. */
  filterByTestId: (this: SelectorClass, testId: string) => SelectorClass;

  /** Finds all descendants of all nodes in the matching set and filters them by locator parameter. */
  findByLocatorParameter: (this: SelectorClass, parameter: string, value: string) => SelectorClass;

  /** Finds all descendants of all nodes in the matching set and filters them by testId. */
  findByTestId: (this: SelectorClass, testId: string) => SelectorClass;

  /** Get string description of selector if any. */
  getDescription: (this: SelectorClass) => string | undefined;

  /** Returns the value of the locator parameter. */
  getLocatorParameter: (this: SelectorClass, parameter: string) => Promise<string | null>;

  /** Returns the value of the test id. */
  getTestId: (this: SelectorClass) => Promise<string | null>;

  /** true if the element has the locator parameter. */
  hasLocatorParameter: (this: SelectorClass, parameter: string) => Promise<boolean>;

  /** true if the element has the test id. */
  hasTestId: (this: SelectorClass) => Promise<boolean>;
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

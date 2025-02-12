import type {AttributesOptions} from '../createLocator';
// eslint-disable-next-line import/no-internal-modules
import type {Selector} from '../utils/selectors/Selector';

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
export type {Selector};

/**
 * Data for retrying property of Selector.
 * @internal
 */
export type SelectorPropertyRetryData = Readonly<{
  args?: readonly string[];
  property: string;
  selector: Selector;
}>;

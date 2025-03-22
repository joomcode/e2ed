// eslint-disable-next-line import/no-unused-modules
import type {SafeHtml} from './html';

/**
 * Extends global namespaces.
 * @internal
 */
declare global {
  /**
   * JSX namespace for checking types of JSX elements.
   */
  namespace JSX {
    /**
     * Child element (value of `children` property).
     */
    type Child = Element | number | string | readonly Child[];

    /**
     * JSX functional component.
     * @internal
     */
    type Component<Props extends Properties = Properties> = (
      this: void,
      properties?: Props,
    ) => Element;

    /**
     * Creates JSX elements.
     */
    type CreateElement = (
      this: void,
      type: ElementType,
      properties: object | null,
      ...children: readonly Child[]
    ) => Element;

    type Element = SafeHtml;

    type ElementChildrenAttribute = {children: {}};

    type ElementType = Component | HtmlTag;

    /**
     * Creates fragment (`<>...</>`).
     */
    type Fragment = Component;

    /**
     * HTML tag name, e.g. `'a'`.
     */
    type HtmlTag = keyof HTMLElementTagNameMap;

    type IntrinsicElements = {
      [Tag in HtmlTag]: Partial<
        Omit<HTMLElementTagNameMap[Tag], 'children' | 'className'> & {
          children?: Child;
          class?: string;
        }
      >;
    };

    /**
     * JSX properties.
     */
    type Properties = Readonly<{children?: Child}>;

    /**
     * JSX runtime (functions `createElement` and `Fragment`).
     */
    type Runtime = Readonly<{Fragment: Fragment; createElement: CreateElement}>;
  }

  /**
   * Extends nodejs's `require` function.
   */
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Require {
      // eslint-disable-next-line @typescript-eslint/prefer-function-type
      <ModuleExports = import('./utils').Any>(modulePath: string): ModuleExports;
    }
  }
}

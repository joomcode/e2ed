/* eslint-disable max-lines, @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion */

import {inspect} from 'node:util';

import {RETRY_KEY} from '../../constants/internal';
import {getFrameContext} from '../../context/frameContext';
import {getPlaywrightPage} from '../../useContext';

import {getAttributeCssSelector} from './getAttributeCssSelector';

import type {Locator as PlaywrightLocator} from '@playwright/test';

import type {AttributesOptions} from '../../createLocator';
import type {SelectorPropertyRetryData} from '../../types/internal';

const setRetryData = (
  promise: Promise<unknown>,
  retryData: Omit<SelectorPropertyRetryData, 'selector'> & {selector: Selector},
): void => {
  // eslint-disable-next-line no-param-reassign
  (promise as {[RETRY_KEY]?: unknown})[RETRY_KEY] = retryData;
};

function toJSON(this: object): string {
  return JSON.stringify(this);
}

type Args = readonly (RegExp | number | string)[];

type Kind = 'css' | 'filter' | 'find' | 'nth' | 'parent' | 'withText';

type Options = Readonly<{
  args?: Args | undefined;
  cssString: string;
  kind?: Kind;
  parentSelector?: Selector;
}> &
  Omit<AttributesOptions, 'testIdSeparator'>;

/**
 * Selector.
 */
class Selector {
  readonly description: string;

  private readonly args: Args | undefined;

  private readonly cssString: string;

  private readonly kind: 'css' | 'filter' | 'find' | 'nth' | 'parent' | 'withText';

  private readonly parameterAttributePrefix: string;

  private readonly parentSelector: Selector | undefined;

  private readonly testIdAttribute: string;

  protected constructor({
    args,
    cssString,
    kind = 'css',
    parameterAttributePrefix,
    parentSelector,
    testIdAttribute,
  }: Options) {
    this.args = args;
    this.cssString = cssString;
    this.description =
      kind === 'css' ? cssString : `${parentSelector!.description}.${kind}(${args?.join(', ')})`;
    this.kind = kind;
    this.parameterAttributePrefix = parameterAttributePrefix;
    this.parentSelector = parentSelector;
    this.testIdAttribute = testIdAttribute;
  }

  get boundingClientRect(): Promise<DOMRectReadOnly> {
    const result = this.getPlaywrightLocator()
      .boundingBox()
      .then((box) => {
        const {height, width, x, y} = box ?? {height: 0, width: 0, x: 0, y: 0};

        const bottom = height + y;
        const right = width + x;

        return {bottom, height, left: x, right, toJSON, top: y, width, x, y};
      });

    setRetryData(result, {property: 'boundingClientRect', selector: this});

    return result;
  }

  get checked(): Promise<boolean | undefined> {
    const result = this.getPlaywrightLocator()
      .isChecked()
      .catch(() => undefined);

    setRetryData(result, {property: 'checked', selector: this});

    return result;
  }

  get count(): Promise<number> {
    const result = this.getPlaywrightLocator().count();

    setRetryData(result, {property: 'count', selector: this});

    return result;
  }

  get exists(): Promise<boolean> {
    const result = this.getPlaywrightLocator()
      .count()
      .then((count) => count > 0);

    setRetryData(result, {property: 'exists', selector: this});

    return result;
  }

  get scrollHeight(): Promise<number> {
    const result = this.getPlaywrightLocator().evaluate((element) => element.scrollHeight);

    setRetryData(result, {property: 'scrollHeight', selector: this});

    return result;
  }

  get scrollLeft(): Promise<number> {
    const result = this.getPlaywrightLocator().evaluate((element) => element.scrollLeft);

    setRetryData(result, {property: 'scrollLeft', selector: this});

    return result;
  }

  get scrollTop(): Promise<number> {
    const result = this.getPlaywrightLocator().evaluate((element) => element.scrollTop);

    setRetryData(result, {property: 'scrollTop', selector: this});

    return result;
  }

  get scrollWidth(): Promise<number> {
    const result = this.getPlaywrightLocator().evaluate((element) => element.scrollWidth);

    setRetryData(result, {property: 'scrollWidth', selector: this});

    return result;
  }

  get textContent(): Promise<string> {
    const result = this.getPlaywrightLocator()
      .textContent()
      .then((content) => content ?? '');

    setRetryData(result, {property: 'textContent', selector: this});

    return result;
  }

  get value(): Promise<string | undefined> {
    const result = this.getPlaywrightLocator()
      .inputValue()
      .catch(() => undefined);

    setRetryData(result, {property: 'value', selector: this});

    return result;
  }

  get visible(): Promise<boolean> {
    const result = this.getPlaywrightLocator().isVisible();

    setRetryData(result, {property: 'visible', selector: this});

    return result;
  }

  static create({
    cssString,
    parameterAttributePrefix,
    testIdAttribute,
  }: Pick<Options, 'cssString' | 'parameterAttributePrefix' | 'testIdAttribute'>): Selector {
    return new Selector({cssString, parameterAttributePrefix, testIdAttribute});
  }

  createSelector(cssString: string): Selector {
    const {parameterAttributePrefix, testIdAttribute} = this;

    return new Selector({cssString, parameterAttributePrefix, testIdAttribute});
  }

  filter(cssSelectorString: string): Selector {
    return this.createChildSelector('filter', [cssSelectorString]);
  }

  filterByLocatorParameter(parameter: string, value: string): Selector {
    return this.filter(getAttributeCssSelector(this.getParameterAttribute(parameter), value));
  }

  filterByTestId(testId: string): Selector {
    return this.filter(getAttributeCssSelector(this.testIdAttribute, testId));
  }

  find(cssSelectorString: string): Selector {
    return this.createChildSelector('find', [cssSelectorString]);
  }

  findByLocatorParameter(parameter: string, value: string): Selector {
    return this.find(getAttributeCssSelector(this.getParameterAttribute(parameter), value));
  }

  findByTestId(testId: string): Selector {
    return this.find(getAttributeCssSelector(this.testIdAttribute, testId));
  }

  getAttribute(attributeName: string): Promise<string | null> {
    const result = this.getPlaywrightLocator().getAttribute(attributeName);

    setRetryData(result, {args: [attributeName], property: 'getAttribute', selector: this});

    return result;
  }

  getLocatorParameter(parameter: string): Promise<string | null> {
    return this.getAttribute(this.getParameterAttribute(parameter));
  }

  getPlaywrightLocator(): PlaywrightLocator {
    const args = this.args!;
    const selector = this.parentSelector!;

    switch (this.kind) {
      case 'css':
        return (getFrameContext() ?? getPlaywrightPage()).locator(this.cssString);

      case 'filter':
        return selector.getPlaywrightLocator().and(getPlaywrightPage().locator(String(args[0])));

      case 'find':
        return selector
          .getPlaywrightLocator()
          .locator(getPlaywrightPage().locator(String(args[0])));

      case 'nth':
        return selector.getPlaywrightLocator().nth(Number(args[0]));

      case 'parent':
        return selector.getPlaywrightLocator().locator('xpath=..');

      case 'withText':
        return selector.getPlaywrightLocator().filter({hasText: args[0] as RegExp | string});

      // no default
    }
  }

  getStyleProperty(propertyName: string): Promise<string> {
    const result = this.getPlaywrightLocator().evaluate(
      (element, property) => getComputedStyle(element).getPropertyValue(property),
      propertyName,
    );

    setRetryData(result, {args: [propertyName], property: 'getStyleProperty', selector: this});

    return result;
  }

  getTestId(): Promise<string | null> {
    return this.getAttribute(this.testIdAttribute);
  }

  hasAttribute(attributeName: string): Promise<boolean> {
    const result = this.getPlaywrightLocator()
      .getAttribute(attributeName)
      .then((attribute) => typeof attribute === 'string');

    setRetryData(result, {args: [attributeName], property: 'hasAttribute', selector: this});

    return result;
  }

  hasLocatorParameter(parameter: string): Promise<boolean> {
    return this.hasAttribute(this.getParameterAttribute(parameter));
  }

  hasTestId(): Promise<boolean> {
    return this.hasAttribute(this.testIdAttribute);
  }

  nth(index: number): Selector {
    return this.createChildSelector('nth', [index]);
  }

  parent(): Selector {
    return this.createChildSelector('parent');
  }

  toJSON(): {description: string} {
    return {description: this.description};
  }

  /**
   * Custom string presentation of selector.
   */
  toString(): string {
    return `Selector for ${this.description}`;
  }

  withText(textOrRegExp: RegExp | string): Selector {
    return this.createChildSelector('withText', [textOrRegExp]);
  }

  private createChildSelector(kind: Kind, args?: Args): Selector {
    const {cssString, parameterAttributePrefix, testIdAttribute} = this;

    return new Selector({
      args,
      cssString,
      kind,
      parameterAttributePrefix,
      parentSelector: this,
      testIdAttribute,
    });
  }

  private getParameterAttribute(parameter: string): string {
    return this.parameterAttributePrefix + parameter;
  }
}

/**
 * Custom presentation of selector for `nodejs` `inspect`.
 */
// eslint-disable-next-line @typescript-eslint/unbound-method
Selector.prototype[inspect.custom as unknown as 'toString'] = Selector.prototype.toString;

export {Selector};

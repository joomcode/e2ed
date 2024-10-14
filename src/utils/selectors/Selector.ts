/* eslint-disable max-lines, @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion */

import {RETRY_KEY} from '../../constants/internal';
import {getFrameContext} from '../../context/frameContext';
import {getPlaywrightPage} from '../../useContext';

import type {Locator as PlaywrightLocator} from '@playwright/test';

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

/**
 * Selector.
 */
export class Selector {
  readonly cssString: string;

  private args?: readonly (RegExp | number | string)[];

  private kind: 'css' | 'filter' | 'find' | 'nth' | 'parent' | 'withText';

  private parentSelector?: Selector;

  constructor(cssString: string) {
    this.cssString = cssString;
    this.kind = 'css';
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

  filter(cssSelectorString: string): Selector {
    const selector = new Selector(this.cssString);

    selector.args = [cssSelectorString];
    selector.kind = 'filter';
    selector.parentSelector = this;

    return selector;
  }

  find(cssSelectorString: string): Selector {
    const selector = new Selector(this.cssString);

    selector.args = [cssSelectorString];
    selector.kind = 'find';
    selector.parentSelector = this;

    return selector;
  }

  getAttribute(attributeName: string): Promise<string | null> {
    const result = this.getPlaywrightLocator().getAttribute(attributeName);

    setRetryData(result, {args: [attributeName], property: 'getAttribute', selector: this});

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-return
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

  hasAttribute(attributeName: string): Promise<boolean> {
    const result = this.getPlaywrightLocator()
      .getAttribute(attributeName)
      .then((attribute) => typeof attribute === 'string');

    setRetryData(result, {args: [attributeName], property: 'hasAttribute', selector: this});

    return result;
  }

  nth(index: number): Selector {
    const selector = new Selector(this.cssString);

    selector.args = [index];
    selector.kind = 'nth';
    selector.parentSelector = this;

    return selector;
  }

  parent(): Selector {
    const selector = new Selector(this.cssString);

    selector.kind = 'parent';
    selector.parentSelector = this;

    return selector;
  }

  withText(textOrRegExp: RegExp | string): Selector {
    const selector = new Selector(this.cssString);

    selector.args = [textOrRegExp];
    selector.kind = 'withText';
    selector.parentSelector = this;

    return selector;
  }
}

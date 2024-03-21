import {assertValueIsFalse, assertValueIsNotNull} from './asserts';

import type {Attributes, PARAMETERS} from '../createLocator';
import type {Any, Class, Selector} from '../types/internal';

type AnyLocator = ((parameters?: Attributes) => Selector) & {readonly [PARAMETERS]?: object};

type Keys<SomeLocator extends AnyLocator> = keyof SomeLocator[typeof PARAMETERS] & string;

type Options<
  SomeLocator extends AnyLocator,
  Instance extends Readonly<{locator: SomeLocator}>,
> = Readonly<{
  PageObjectClass: Class<[Any], Instance>;
  keyParameter: Keys<SomeLocator>;
  locator: SomeLocator;
}>;

/**
 * Creates record of pageObject's from their constructor and multilocator with them.
 */
export const createPageObjectsFromMultiLocator = async <
  SomeLocator extends AnyLocator,
  Instance extends Readonly<{locator: SomeLocator}>,
>({
  keyParameter,
  locator,
  PageObjectClass,
}: Options<SomeLocator, Instance>): Promise<Readonly<Record<Keys<SomeLocator>, Instance>>> => {
  const logParams = {
    PageObjectClassName: PageObjectClass.name,
    keyParameter,
    locator: String(locator),
  };
  const multiSelector = locator();
  const numberOfPageObjects = await multiSelector.count;

  const result = Object.create(null) as Record<string, Instance>;

  for (let index = 0; index < numberOfPageObjects; index += 1) {
    const selector = multiSelector.nth(index);
    const parameter = await selector.getLocatorParameter(keyParameter);

    assertValueIsNotNull(parameter, 'parameter is not null', logParams);
    assertValueIsFalse(parameter in result, 'parameter is unique key', {...logParams, parameter});

    const locatorWithParameter = locator({[keyParameter]: parameter});

    result[parameter] = new PageObjectClass(locatorWithParameter);
  }

  return result as Record<Keys<SomeLocator>, Instance>;
};

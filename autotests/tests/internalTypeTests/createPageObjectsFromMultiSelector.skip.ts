/* eslint-disable max-classes-per-file */

import {type CreateLocator, createRootLocator, type Locator, type Node} from 'e2ed/createLocator';
import {createPageObjectsFromMultiLocator} from 'e2ed/utils';

import type {IsEqual, Selector, Void} from 'e2ed/types';

type FooLocator = Locator<{qux: Void}, {parameter: 'baz'}>;

type RootLocator = Locator<{foo: Node<{bar: FooLocator}>}>;

const rootLocator = createRootLocator<RootLocator, Selector>('app', {
  mapAttributesChain: () => ({}) as unknown as Selector,
});

const fooLocator = rootLocator.foo.bar;

type BarMappedLocator = CreateLocator<Locator<{qux: Void}>, Selector>;

true satisfies IsEqual<typeof fooLocator, CreateLocator<FooLocator, Selector>>;

class Foo {
  readonly bar: string;

  readonly locator: typeof fooLocator;

  constructor(locator: typeof fooLocator) {
    this.locator = locator;
    this.bar = 'baz';
  }
}

class Bar {
  readonly locator: BarMappedLocator;

  constructor(locator: BarMappedLocator) {
    this.locator = locator;
  }
}

declare const barLocator: BarMappedLocator;

void (async () => {
  const map = await createPageObjectsFromMultiLocator({
    PageObjectClass: Foo,
    keyParameter: 'parameter',
    locator: fooLocator,
  });

  const foo = map.parameter;

  // @ts-expect-error: wrong parameter name
  void map.bar;

  if (foo !== undefined) {
    foo.bar satisfies string;
  }

  await createPageObjectsFromMultiLocator({
    PageObjectClass: Foo,
    // @ts-expect-error: wrong parameter name
    keyParameter: 'foo',
    locator: fooLocator,
  });

  await createPageObjectsFromMultiLocator({
    // @ts-expect-error: wrong locator in class
    PageObjectClass: Bar,
    keyParameter: 'parameter',
    locator: fooLocator,
  });

  await createPageObjectsFromMultiLocator({
    PageObjectClass: Bar,
    // @ts-expect-error: locator without parameters
    keyParameter: '',
    locator: barLocator,
  });

  return map;
})();

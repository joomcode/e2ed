import {getPlaywrightPage} from './page';

import type {Page} from '@playwright/test';

import type {Clear, Get, GetWithDefaultValue, Set} from './types';

type Context<Type> = {contexts: Record<number, Type>};

type PageWithCtx = Page & {ctx?: object};

type UseContext = (<Type>() => [get: Get<Type>, set: Set<Type>, clear: Clear]) &
  (<Type>(defaultValue: Type) => [get: GetWithDefaultValue<Type>, set: Set<Type>, clear: Clear]);

let callCount = 0;

/**
 * Creates functions for `get`, `set` and `clear` some typed value in test context.
 */
export const useContext = (<Type>(defaultValue?: Type) => {
  callCount += 1;

  const contextIndex = callCount;

  /**
   * Set value to test context.
   */
  const set = (value: Type): void => {
    const page: PageWithCtx = getPlaywrightPage();

    if (page.ctx === undefined) {
      page.ctx = Object.create(null) as {};
    }

    if ((page.ctx as Partial<Context<Type>>).contexts === undefined) {
      (page.ctx as Partial<Context<Type>>).contexts = {};
    }

    const {contexts} = page.ctx as Context<Type>;

    contexts[contextIndex] = value;
  };

  /**
   * Clear value in test context (set value to `undefined`).
   */
  const clear = (): void => set(undefined as unknown as Type);

  if (defaultValue === undefined) {
    /**
     * Get value from test context.
     */
    const get = (): Type | undefined => {
      const page: PageWithCtx = getPlaywrightPage();

      if (page.ctx === undefined) {
        page.ctx = Object.create(null) as {};
      }

      const {contexts}: Partial<Context<Type>> = page.ctx;

      return contexts?.[contextIndex];
    };

    return [get, set, clear];
  }

  /**
   * Get value from test context (or default value, if it is `undefined`).
   */
  const getWithDefaultValue = (): Type => {
    const page: PageWithCtx = getPlaywrightPage();

    if (page.ctx === undefined) {
      page.ctx = Object.create(null) as {};
    }

    const {contexts}: Partial<Context<Type>> = page.ctx;

    return contexts?.[contextIndex] ?? defaultValue;
  };

  return [getWithDefaultValue, set, clear];
}) as UseContext;

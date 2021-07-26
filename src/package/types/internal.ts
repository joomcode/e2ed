import type {OneOrTwoArgs, UnionToIntersection} from './utils';

export * from './request';

export * from './utils';

export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * Overloaded type for navigateToPage function.
 */
export type NavigateToPage<
  Pages extends Record<string, {willNavigateTo(...args: never[]): unknown}>,
> = UnionToIntersection<
  {
    [K in keyof Pages]: (
      ...args: OneOrTwoArgs<K, Parameters<Pages[K]['willNavigateTo']>[0]>
    ) => Promise<Pages[K]>;
  }[keyof Pages]
>;

export type Selector = SelectorAPI;

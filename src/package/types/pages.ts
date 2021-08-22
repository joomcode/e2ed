import type {OneOrTwoArgs, UnionToIntersection} from './utils';

type WithWillNavigateTo = {willNavigateTo(...args: never[]): unknown};

type GetPageParams<Page extends WithWillNavigateTo> = Parameters<Page['willNavigateTo']>[0];

type GetRouteParams<Page extends WithWillNavigateTo> = ReturnType<
  Page['willNavigateTo']
> extends Promise<infer RouteParams>
  ? RouteParams
  : never;

type AssertPageOverload<PageName, Page extends WithWillNavigateTo> = (
  ...args: OneOrTwoArgs<PageName, GetRouteParams<Page>>
) => Promise<Page>;

type PagesWithWillNavigateTo = Record<string, WithWillNavigateTo>;

type NavigateToPageOverload<PageName, Page extends WithWillNavigateTo> = (
  ...args: OneOrTwoArgs<PageName, GetPageParams<Page>>
) => Promise<Page>;

/**
 * Overloaded type for assertPage function.
 */
export type AssertPage<Pages extends PagesWithWillNavigateTo> = UnionToIntersection<
  {
    [PageName in keyof Pages]: AssertPageOverload<PageName, Pages[PageName]>;
  }[keyof Pages]
>;

/**
 * Overloaded type for navigateToPage function.
 */
export type NavigateToPage<Pages extends PagesWithWillNavigateTo> = UnionToIntersection<
  {
    [PageName in keyof Pages]: NavigateToPageOverload<PageName, Pages[PageName]>;
  }[keyof Pages]
>;

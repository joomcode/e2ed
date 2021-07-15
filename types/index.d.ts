import type { OneOrTwoArgs, UnionToIntersection } from './utils';
export * from '../../../e2ed/types';
export * from './context';
export * from './request';
export declare type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};
export declare type NavigateToPage<Pages extends Record<string, {
    willNavigateTo(...args: never[]): unknown;
}>> = UnionToIntersection<{
    [K in keyof Pages]: (...args: OneOrTwoArgs<K, Parameters<Pages[K]['willNavigateTo']>[0]>) => Promise<Pages[K]>;
}[keyof Pages]>;

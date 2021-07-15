declare const BRAND: unique symbol;
export declare type Brand<T, K extends string> = T & {
    [BRAND]: K;
};
declare type IncludeUndefined<T> = true extends (T extends undefined ? true : never) ? true : false;
export declare type OneOrTwoArgs<K, A> = IncludeUndefined<A> extends true ? [K, A?] : [K, A];
export declare type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export {};

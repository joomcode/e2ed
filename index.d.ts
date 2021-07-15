import { pages } from './pageObjects';
import type { NavigateToPage } from './types';
export * from './ApiRoute';
export * from './Page';
export * from './PageRoute';
export * from './Route';
declare type Pages = typeof pages;
export declare const navigateToPage: NavigateToPage<Pages>;

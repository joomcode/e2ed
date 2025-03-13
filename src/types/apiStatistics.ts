import type {Brand} from './brand';
import type {Method, StatusCode, Url} from './http';

/**
 * API statistics of `e2ed` run.
 */
export type ApiStatistics = Readonly<{
  pages: Readonly<Record<PageName, Readonly<Record<Url, PageStatistics>>>>;
  requests: Readonly<Record<Url, Readonly<Partial<Record<Method, RequestStatistics>>>>>;
  resources: Readonly<Record<Url, RequestStatistics>>;
}>;

/**
 * Page name (as name of page class).
 */
export type PageName = Brand<string, 'PageName'>;

/**
 * Statistics of one page.
 */
export type PageStatistics = Readonly<{count: number; duration: number}>;

/**
 * Statistics of one API request.
 */
export type RequestStatistics = Readonly<Partial<Record<StatusCode, StatisticsUnit>>>;

/**
 * Unit of summary statistics for some exact conditions.
 */
export type StatisticsUnit = Readonly<{count: number; duration: number; size: number}>;

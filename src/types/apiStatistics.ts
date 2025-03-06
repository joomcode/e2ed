import type {Method, StatusCode, Url} from './http';

/**
 * API statistics of `e2ed` run.
 */
export type ApiStatistics = Readonly<{
  requests: Readonly<Record<Url, Readonly<Partial<Record<Method, RequestStatistics>>>>>;
}>;

/**
 * Statistics of one API request (by `origin`).
 */
export type RequestStatistics = Readonly<Partial<Record<StatusCode, StatisticsUnit>>>;

/**
 * Unit of summary statistics for some exact conditions.
 */
export type StatisticsUnit = Readonly<{count: number; duration: number; size: number}>;

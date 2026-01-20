/* eslint-disable max-depth */

import {URL} from 'node:url';

import {LogEventType} from '../../constants/internal';

import {flatLogEvents} from '../flatLogEvents';

import {isScreenshotLog} from './client';

import type {ReportData} from '../../types/internal';

/**
 * Get string with images hosts using in HTML report, for CSP `img-src` rule.
 * @internal
 */
export const getImgCspHosts = (reportData: ReportData): string => {
  const hosts = Object.create(null) as Record<string, true>;
  const {retries} = reportData;

  const processMaybeUrl = (maybeUrl: unknown): void => {
    if (typeof maybeUrl === 'string' && maybeUrl.startsWith('https://')) {
      try {
        const {origin} = new URL(maybeUrl);

        hosts[origin] = true;
      } catch {}
    }
  };

  for (const {fullTestRuns} of retries) {
    for (const {logEvents} of fullTestRuns) {
      for (const {payload, type} of flatLogEvents(logEvents)) {
        if (type !== LogEventType.InternalAssert || payload === undefined) {
          continue;
        }

        const {actual, diff, expected} = payload;

        if (isScreenshotLog(actual)) {
          processMaybeUrl(actual.url);
        }

        if (isScreenshotLog(diff)) {
          processMaybeUrl(diff.url);
        }

        if (isScreenshotLog(expected)) {
          processMaybeUrl(expected.url);
        }
      }
    }
  }

  return Object.keys(hosts).join(' ');
};

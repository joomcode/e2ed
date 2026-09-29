import {INVALID_JSON_MESSAGE_LENGTH} from './constants';

import type {HtmlReportJsonData} from '../../../types/internal';

/**
 * Parses JSON data from one `<script>` tag of HTML report.
 * @internal
 */
export const parseJsonData = (content: string): HtmlReportJsonData | string => {
  try {
    return JSON.parse(content) as HtmlReportJsonData;
  } catch {
    return `Cannot parse JSON data in <script> tag of HTML report: ${content.slice(0, INVALID_JSON_MESSAGE_LENGTH)}`;
  }
};

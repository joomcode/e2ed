/**
 * Class attribute for `<script>` with JSON data in HTML report
 * (part of HTML report format, see `JSON_REPORT_DATA_ATTRIBUTES`).
 * @internal
 */
export const JSON_REPORT_DATA_CLASS = 'e2edJsonReportData';

/**
 * Attributes for `<script>` with JSON data in HTML report.
 * These attributes (their values and their order) are part of the HTML report format:
 * `readJsonDataFromHtmlReport` finds JSON data by the exact string
 * `<script class="e2edJsonReportData" type="application/json">`, built from this object,
 * so any change here will break reading of already existing reports.
 * @internal
 */
export const JSON_REPORT_DATA_ATTRIBUTES = {
  class: JSON_REPORT_DATA_CLASS,
  type: 'application/json',
} as const satisfies JSX.IntrinsicElements['script'];

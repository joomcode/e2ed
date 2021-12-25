import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import type {ReportData, SafeHtml} from '../../../types/internal';

/**
 * Render tag <script type="application/json"> with JSON representation of report data.
 * @internal
 */
export const renderJsonData = (reportData: ReportData): SafeHtml => {
  const {testRunsWithHooks} = reportData;

  const jsonString = JSON.stringify(testRunsWithHooks);

  return e2edCreateSafeHtmlWithoutSanitize`
<script id="e2edJsonReportData" type="application/json">${jsonString}</script>`;
};

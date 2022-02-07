import {createSafeHtmlWithoutSanitize} from '../client';

import type {ReportData, SafeHtml} from '../../../types/internal';

/**
 * Render tag <script type="application/json"> with JSON representation of report data.
 * @internal
 */
export const renderJsonData = (reportData: ReportData): SafeHtml => {
  const {fullTestRuns} = reportData;

  const jsonString = JSON.stringify(fullTestRuns);

  return createSafeHtmlWithoutSanitize`
<script id="e2edJsonReportData" type="application/json">${jsonString}</script>`;
};

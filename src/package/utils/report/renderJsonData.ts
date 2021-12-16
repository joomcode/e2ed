import type {ReportData} from '../../types/internal';

/**
 * Render tag <script type="application/json"> with JSON representation of report data.
 * @internal
 */
export const renderJsonData = (reportData: ReportData): string => {
  const {testRunsWithHooks} = reportData;

  const jsonString = JSON.stringify(testRunsWithHooks);

  return `<script id="e2edJsonReportData" type="application/json">${jsonString}</script>`;
};

import type {ReportData} from '../../types/internal';

/**
 * Render tag <script type="application/json"> with JSON representation of report data.
 * @internal
 */
export const renderJsonData = (reportData: ReportData): string => {
  const {testRuns} = reportData;

  const jsonString = JSON.stringify(testRuns);

  return `<script id="e2edJsonReportData" type="application/json">${jsonString}</script>`;
};

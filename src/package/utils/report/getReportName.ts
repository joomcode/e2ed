import type {UtcTimeInMs} from '../../types/internal';

/**
 * Get report name by start tests time.
 * It used in report file name and in report HTML title.
 * @internal
 */
export const getReportName = (startTimeInMs: UtcTimeInMs): string => {
  const reportNameFromEnvironment = process.env.E2ED_REPORT_NAME;

  if (reportNameFromEnvironment) {
    return reportNameFromEnvironment;
  }

  const date = new Date(startTimeInMs);
  const dateTimeString = date.toISOString().slice(0, 19);

  return `e2ed-report-${dateTimeString}`;
};

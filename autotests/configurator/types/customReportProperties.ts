/**
 * Custom report properties, that `doAfterPack` functions can return when the pack completes.
 */
export type CustomReportProperties = Readonly<{
  externalPackRunId: number;
}>;

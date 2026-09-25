const scriptTag = '<script class="e2edJsonReportData" type="application/json">';

/**
 * Get beginning of JSON data in HTML report partial source, if any.
 * @internal
 */
export const getJsonDataBeginning = (partialSource: string): string | undefined => {
  const index = partialSource.indexOf(scriptTag);

  if (index === -1) {
    return;
  }

  return partialSource.slice(index + scriptTag.length);
};

import type {HtmlReportJsonData} from '../../../types/internal';

type Return = Readonly<{
  jsonData: readonly HtmlReportJsonData[];
  tail: string;
}>;

// </script><script class="e2edJsonReportData" type="application/json">

/**
 * Reads JSON data from complete JSON source.
 * @internal
 */
export const readJsonData = (jsonSource: string): Return => {
  const parts = jsonSource.split(
    '</script><script class="e2edJsonReportData" type="application/json">',
  );

  const lastPart = parts.pop();

  if (lastPart === undefined) {
    throw new Error('Cannot parse JSON data from HTML report');
  }

  const jsonData = parts.map((part) => JSON.parse(part) as HtmlReportJsonData);

  try {
    jsonData.push(JSON.parse(lastPart) as HtmlReportJsonData);
  } catch {
    return {jsonData, tail: lastPart};
  }

  return {jsonData, tail: ''};
};

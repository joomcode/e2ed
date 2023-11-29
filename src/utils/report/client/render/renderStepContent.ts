import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import type {LogPayload, SafeHtml} from '../../../../types/internal';

const sanitizeHtml = clientSanitizeHtml;

type Options = Readonly<{
  pathToScreenshotFromReportPage: string | undefined;
  payload: LogPayload | undefined;
}>;

/**
 * Renders content of single step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderStepContent({pathToScreenshotFromReportPage, payload}: Options): SafeHtml {
  if (payload === undefined) {
    return sanitizeHtml``;
  }

  const payloadString = JSON.stringify(payload, null, 2);
  const code = sanitizeHtml`<code>${payloadString}</code>`;
  const content = pathToScreenshotFromReportPage
    ? sanitizeHtml`<pre>${code}</pre><img src="${pathToScreenshotFromReportPage}" alt="Screenshot from test">`
    : code;

  const contentTag = pathToScreenshotFromReportPage ? 'div' : 'pre';

  return sanitizeHtml`<${contentTag} class="step-expanded-panel step__panel">${content}</${contentTag}>`;
}

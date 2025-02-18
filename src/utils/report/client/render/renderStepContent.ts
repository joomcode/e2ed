import {LogEventType} from '../../../../constants/internal';

import {
  createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize,
  sanitizeHtml as clientSanitizeHtml,
} from '../sanitizeHtml';

import type {LogPayload, SafeHtml} from '../../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;
const sanitizeHtml = clientSanitizeHtml;

type Options = Readonly<{
  pathToScreenshotOfPage: string | undefined;
  payload: LogPayload | undefined;
  type: LogEventType;
}>;

/**
 * Renders content of single step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderStepContent({pathToScreenshotOfPage, payload, type}: Options): SafeHtml {
  if (payload === undefined) {
    return sanitizeHtml``;
  }

  const payloadString = JSON.stringify(payload, null, 2);
  const code = sanitizeHtml`<code>${payloadString}</code>`;
  const images: SafeHtml[] = [];

  if (pathToScreenshotOfPage !== undefined) {
    images.push(
      sanitizeHtml`<img src="${pathToScreenshotOfPage}" alt="Screenshot of page" title="Screenshot of page">`,
    );
  }

  if (type === LogEventType.InternalAssert) {
    const {actualScreenshotUrl, diffScreenshotUrl, expectedScreenshotUrl} = payload;

    if (typeof actualScreenshotUrl === 'string') {
      images.push(sanitizeHtml`<img src="${actualScreenshotUrl}" alt="Actual" title="Actual">`);
    }

    if (typeof diffScreenshotUrl === 'string') {
      images.push(sanitizeHtml`<img src="${diffScreenshotUrl}" alt="Diff" title="Diff">`);
    }

    if (typeof expectedScreenshotUrl === 'string') {
      images.push(
        sanitizeHtml`<img src="${expectedScreenshotUrl}" alt="Expected" title="Expected">`,
      );
    }
  }

  const imagesHtml = createSafeHtmlWithoutSanitize`${images.join('')}`;
  const content = images.length > 0 ? sanitizeHtml`<pre>${code}</pre>${imagesHtml}` : code;
  const contentTag = images.length > 0 ? 'div' : 'pre';

  return sanitizeHtml`<${contentTag} class="step-expanded-panel step__panel">${content}</${contentTag}>`;
}

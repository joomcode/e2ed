import {LogEventType} from '../../../../constants/internal';

import {createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize} from '../sanitizeHtml';

import type {LogPayload, SafeHtml} from '../../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;

declare const jsx: JSX.Runtime;

type Props = Readonly<{
  pathToScreenshotOfPage: string | undefined;
  payload: LogPayload | undefined;
  type: LogEventType;
}>;

/**
 * Renders content of single step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const StepContent: JSX.Component<Props> = ({pathToScreenshotOfPage, payload, type}) => {
  if (payload === undefined) {
    return <></>;
  }

  const payloadString = JSON.stringify(payload, null, 2);
  const code = <code>{payloadString}</code>;
  const images: SafeHtml[] = [];

  if (pathToScreenshotOfPage !== undefined) {
    images.push(
      <img src={pathToScreenshotOfPage} alt="Screenshot of page" title="Screenshot of page" />,
    );
  }

  if (type === LogEventType.InternalAssert) {
    const {actualScreenshotUrl, diffScreenshotUrl, expectedScreenshotUrl} = payload;

    if (typeof actualScreenshotUrl === 'string') {
      images.push(<img src={actualScreenshotUrl} alt="Actual" title="Actual" />);
    }

    if (typeof diffScreenshotUrl === 'string') {
      images.push(<img src={diffScreenshotUrl} alt="Diff" title="Diff" />);
    }

    if (typeof expectedScreenshotUrl === 'string') {
      images.push(<img src={expectedScreenshotUrl} alt="Expected" title="Expected" />);
    }
  }

  const imagesHtml = createSafeHtmlWithoutSanitize`${images.join('')}`;

  if (images.length > 0) {
    return (
      <div class="step-expanded-panel step__panel">
        <pre>{code}</pre>
        {imagesHtml}
      </div>
    );
  }

  return <pre class="step-expanded-panel step__panel">{code}</pre>;
};

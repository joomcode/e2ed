import {LogEventType} from '../../../../constants/internal';

import {List as clientList} from './List';
import {Screenshot as clientScreenshot} from './Screenshot';

import type {LogPayload, SafeHtml} from '../../../../types/internal';

const List = clientList;
const Screenshot = clientScreenshot;

declare const jsx: JSX.Runtime;

type Props = Readonly<{
  pathToScreenshotOfPage: string | undefined;
  payload: LogPayload;
  type: LogEventType;
}>;

/**
 * Renders content of single step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const StepContent: JSX.Component<Props> = ({pathToScreenshotOfPage, payload, type}) => {
  const payloadString = JSON.stringify(payload, null, 2);
  const screenshots: SafeHtml[] = [];

  if (pathToScreenshotOfPage !== undefined) {
    screenshots.push(<Screenshot name="Screenshot of page" open src={pathToScreenshotOfPage} />);
  }

  if (type === LogEventType.InternalAssert) {
    const {actualScreenshotUrl, diffScreenshotUrl, expectedScreenshotUrl} = payload;

    if (typeof actualScreenshotUrl === 'string') {
      screenshots.push(<Screenshot name="Actual" src={actualScreenshotUrl} />);
    }

    if (typeof diffScreenshotUrl === 'string') {
      screenshots.push(<Screenshot name="Diff" src={diffScreenshotUrl} />);
    }

    if (typeof expectedScreenshotUrl === 'string') {
      screenshots.push(<Screenshot name="Expected" src={expectedScreenshotUrl} />);
    }
  }

  return (
    <>
      <details class="step-attachment">
        <summary class="step-attachment__title">Details</summary>
        <pre class="step__code">
          <code>{payloadString}</code>
        </pre>
      </details>
      <List elements={screenshots} />
    </>
  );
};

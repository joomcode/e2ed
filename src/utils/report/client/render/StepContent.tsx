import {LogEventType} from '../../../../constants/internal';

import {List as clientList} from './List';
import {Screenshot as clientScreenshot} from './Screenshot';

import type {LogPayload, SafeHtml} from '../../../../types/internal';

const List = clientList;
const Screenshot = clientScreenshot;

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
  const screenshots: SafeHtml[] = [];

  if (pathToScreenshotOfPage !== undefined) {
    screenshots.push(<Screenshot name="Screenshot of page" open url={pathToScreenshotOfPage} />);
  }

  if (type === LogEventType.InternalAssert) {
    const {actualScreenshotUrl, diffScreenshotUrl, expectedScreenshotUrl} = payload;

    if (typeof actualScreenshotUrl === 'string') {
      screenshots.push(<Screenshot name="Actual" url={actualScreenshotUrl} />);
    }

    if (typeof diffScreenshotUrl === 'string') {
      screenshots.push(<Screenshot name="Diff" url={diffScreenshotUrl} />);
    }

    if (typeof expectedScreenshotUrl === 'string') {
      screenshots.push(<Screenshot name="Expected" url={expectedScreenshotUrl} />);
    }
  }

  return (
    <>
      <details class="step-attachment" open>
        <summary class="step-attachment__title">Details</summary>
        <pre class="step__code">
          <code>{payloadString}</code>
        </pre>
      </details>
      <List elements={screenshots} />
    </>
  );
};

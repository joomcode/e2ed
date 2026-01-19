import {LogEventType} from '../../../../constants/internal';

import {isScreenshotLog as clientIsScreenshotLog} from '../isScreenshotLog';

import {List as clientList} from './List';
import {Screenshot as clientScreenshot} from './Screenshot';

import type {DimensionsString, LogPayload, SafeHtml} from '../../../../types/internal';

const isScreenshotLog = clientIsScreenshotLog;
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
    screenshots.push(
      <Screenshot
        dimensions={
          'dimensions' in payload ? (payload['dimensions'] as DimensionsString) : undefined
        }
        name="Screenshot of page"
        open
        url={pathToScreenshotOfPage}
      />,
    );
  }

  if (type === LogEventType.InternalAssert) {
    const {actual, diff, expected} = payload;

    if (isScreenshotLog(actual)) {
      screenshots.push(
        <Screenshot dimensions={actual.dimensions} name="Actual" url={actual.url} />,
      );
    }

    if (isScreenshotLog(diff)) {
      screenshots.push(<Screenshot dimensions={diff.dimensions} name="Diff" url={diff.url} />);
    }

    if (isScreenshotLog(expected)) {
      screenshots.push(
        <Screenshot dimensions={expected.dimensions} name="Expected" url={expected.url} />,
      );
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

import {parseMarkdownLinks as clientParseMarkdownLinks} from '../parseMarkdownLinks';

import {DatesInterval as clientDatesInterval} from './DatesInterval';
import {Duration as clientDuration} from './Duration';
import {List as clientList} from './List';

import type {FullTestRun, ReportClientState, SafeHtml} from '../../../../types/internal';

const parseMarkdownLinks = clientParseMarkdownLinks;
const DatesInterval = clientDatesInterval;
const Duration = clientDuration;
const List = clientList;

declare const jsx: JSX.Runtime;
declare const reportClientState: ReportClientState;

type Props = Readonly<{fullTestRun: FullTestRun}>;

/**
 * Renders tag `<dl class="test-description">` with test run description.
 * The value strings of meta can contain links in markdown format.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const TestRunDescription: JSX.Component<Props> = ({fullTestRun}) => {
  const {endTimeInMs, outputDirectoryName, runError, startTimeInMs} = fullTestRun;
  const {meta} = fullTestRun.options;
  const metaHtmls: SafeHtml[] = [];

  for (const [key, value] of Object.entries(meta)) {
    const valueWithLinks = parseMarkdownLinks`${value}`;
    const metaHtml = (
      <>
        <dt class="test-description__term">{key}</dt>{' '}
        <dd class="test-description__definition">{valueWithLinks}</dd>
      </>
    );

    metaHtmls.push(metaHtml);
  }

  let traceHtml = <></>;

  if (runError !== undefined) {
    const {internalDirectoryName} = reportClientState;
    const traceLabel = 'Download trace';
    const traceName = 'trace.zip';
    const traceUrl = `./${internalDirectoryName}/${outputDirectoryName}/${traceName}`;

    traceHtml = (
      <>
        <dt class="test-description__term">{traceLabel}</dt>{' '}
        <dd class="test-description__definition">
          <a href={traceUrl} download={traceName} aria-label={traceLabel}>
            {traceName}
          </a>
        </dd>
      </>
    );
  }

  return (
    <dl class="test-description" aria-label="Test meta data">
      <List elements={metaHtmls} />
      {traceHtml}
      <dt class="test-description__term">Date</dt>{' '}
      <dd class="test-description__definition">
        <DatesInterval endTimeInMs={endTimeInMs} startTimeInMs={startTimeInMs} />
      </dd>
      <dt class="test-description__term">Duration</dt>{' '}
      <dd class="test-description__definition">
        <Duration durationInMs={endTimeInMs - startTimeInMs} />
      </dd>
    </dl>
  );
};

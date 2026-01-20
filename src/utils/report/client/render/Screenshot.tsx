import type {DimensionsString} from '../../../../types/internal';

declare const jsx: JSX.Runtime;

type Props = Readonly<{
  dimensions?: DimensionsString | undefined;
  name: string;
  open?: boolean;
  url: string;
}>;

/**
 * Renders screenshot of test in HTML report.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const Screenshot: JSX.Component<Props> = ({dimensions, name, open = false, url}) => {
  const withDimensions = dimensions ? ` (${dimensions})` : '';
  const nameWithDimensions = name + withDimensions;

  return (
    <details class="step-attachment" open={open}>
      <summary class="step-attachment__title">{nameWithDimensions}</summary>
      <button
        class="step__screenshot-button"
        type="button"
        aria-haspopup="dialog"
        aria-label="Open full size screenshot"
      >
        <img src={url} alt={nameWithDimensions} title={nameWithDimensions} />
      </button>
    </details>
  );
};

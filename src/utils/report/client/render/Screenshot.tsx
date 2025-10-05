declare const jsx: JSX.Runtime;

type Props = Readonly<{name: string; open?: boolean; src: string}>;

/**
 * Renders screenshot of test in HTML report.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const Screenshot: JSX.Component<Props> = ({name, open = false, src}) => (
  <details class="step-attachment" open={open}>
    <summary class="step-attachment__title">{name}</summary>
    <button
      class="step__screenshot-button"
      type="button"
      aria-haspopup="dialog"
      aria-label="Open full size screenshot"
    >
      <img src={src} alt={name} title={name} />
    </button>
  </details>
);

declare const jsx: JSX.Runtime;

/**
 * Renders drag container to change columns widths.
 * @internal
 */
export const DragContainer: JSX.Component = () => (
  <div
    class="drag-container"
    role="separator"
    tabIndex={0}
    aria-label="separator"
    aria-orientation="vertical"
    aria-valuemax=""
    aria-valuemin="180"
    aria-valuenow=""
  ></div>
);

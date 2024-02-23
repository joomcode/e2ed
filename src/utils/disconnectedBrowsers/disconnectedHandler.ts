import {getRunLabel, setRunLabel} from '../environment';
import {createRunLabel, getRunLabelObject} from '../runLabel';
import {setReadonlyProperty} from '../setReadonlyProperty';
import {exitFromTestsSubprocess} from '../tests';

const disconnectedThresholdInPercent = 40;
const maximumPercentage = 100;

/**
 * Handler of `disconnected` browser event.
 * Called when the number of disconnected browsers changes.
 * @internal
 */
export const disconnectedHandler = async (disconnectedBrowsersCount: number): Promise<void> => {
  const currentRunLabel = getRunLabel();
  const runLabelObject = getRunLabelObject(currentRunLabel);
  const {concurrency} = runLabelObject;

  setReadonlyProperty(runLabelObject, 'disconnectedBrowsersCount', disconnectedBrowsersCount);

  const runLabel = createRunLabel(runLabelObject);

  setRunLabel(runLabel);

  if (
    !(disconnectedBrowsersCount / concurrency < disconnectedThresholdInPercent / maximumPercentage)
  ) {
    await exitFromTestsSubprocess({
      hasError: true,
      reason: `${disconnectedBrowsersCount} out of ${concurrency} browsers are disconnected (${disconnectedThresholdInPercent}% or more)`,
    });
  }
};

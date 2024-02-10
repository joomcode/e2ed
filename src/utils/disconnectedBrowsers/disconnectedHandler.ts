import {getRunLabel, setRunLabel} from '../environment';
import {createRunLabel, getRunLabelObject} from '../runLabel';
import {setReadonlyProperty} from '../setReadonlyProperty';
import {exitFromTestsSubprocess} from '../tests';

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

  if (!(disconnectedBrowsersCount / concurrency < 0.4)) {
    await exitFromTestsSubprocess(true);
  }
};

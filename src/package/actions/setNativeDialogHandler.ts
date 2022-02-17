import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';

type NativeDialogType = 'alert' | 'confirm' | 'beforeunload' | 'prompt';

/**
 * Specifies handler function for the browser native dialogs
 * (alert, confirm, beforeunload, prompt).
 */
export const setNativeDialogHandler = async (
  handler: (type: NativeDialogType, text: string, url: string) => boolean | string | undefined,
): Promise<void> => {
  await log('Set handler function for the browser native dialogs', LogEventType.InternalAction);

  return testController.setNativeDialogHandler(handler);
};

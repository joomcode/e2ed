import {LogEventType} from '../constants/internal';
import {createClientFunction} from '../createClientFunction';
import {log} from '../utils/log';

declare const window: {
  e2edClipboardText?: string;
} & Record<symbol, unknown>;

const SYMBOL_NAME = 'e2ed.mockClipboard.original';

const overrideClipboard = createClientFunction(() => {
  window[Symbol(SYMBOL_NAME)] = {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    readText: navigator.clipboard.readText,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    writeText: navigator.clipboard.writeText,
  };

  navigator.clipboard.writeText = (text) => {
    window.e2edClipboardText = text;

    return Promise.resolve();
  };

  navigator.clipboard.readText = () => Promise.resolve(window.e2edClipboardText ?? '');
}, 'overrideClipboard');

const revertClipboard = createClientFunction(() => {
  Object.assign(navigator.clipboard, window[Symbol(SYMBOL_NAME)]);
}, 'revertClipboard');

const readClipboardText = createClientFunction(
  () => navigator.clipboard.readText(),
  'readClipboardText',
);

const writeClipboardText = createClientFunction(
  (text: string) => navigator.clipboard.writeText(text),
  'writeClipboardText',
);

const clipboardApi = {
  async readText(): Promise<string | undefined> {
    const text = await readClipboardText();

    await log('Read text from clipboard', {text}, LogEventType.Util);

    return text;
  },
  async revert(): Promise<void> {
    await revertClipboard();
    await log('Restore clipboard', {}, LogEventType.Util);
  },
  async writeText(text: string): Promise<void> {
    await writeClipboardText(text);
    await log('Write text to clipboard', {text}, LogEventType.Util);
  },
} as const;

/**
 * Mocks browser clipboard and return clipboard API (readText and writeText).
 */
export const mockClipboard = async (): Promise<typeof clipboardApi> => {
  await log('Override clipboard api', LogEventType.Util);
  await overrideClipboard();

  return clipboardApi;
};

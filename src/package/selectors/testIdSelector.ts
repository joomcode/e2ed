import {Selector} from 'testcafe';

export const testIdSelector = (id: string): Selector => Selector(`[data-testid='${id}']`);

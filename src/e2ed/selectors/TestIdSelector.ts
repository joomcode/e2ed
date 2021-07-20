import {Selector} from 'testcafe';

export const TestIdSelector = (id: string): Selector => Selector(`[data-testid='${id}']`);

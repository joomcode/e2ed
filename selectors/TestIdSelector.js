import { Selector } from 'testcafe';
export const TestIdSelector = (id) => Selector(`[data-testid='${id}']`);

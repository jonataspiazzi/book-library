import { safeBind } from './index';

describe('Test nullConditional', () => {
  test('Should pass args and return', () => {
    const bind = safeBind((l, r) => l + r);
    const result = bind(1, 2);
    expect(result).toBe(3);
  });

  test('Should return null of empty bind', () => {
    const bind = safeBind(undefined);
    const result = bind(1, 2);
    expect(result).toBe(null);
  });
});
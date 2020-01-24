import { normalizer } from './index';

const defaultTest = (value, expectation) => {
  test(`Should "${value}" be normalize for "${expectation}"`, () => {
    expect(normalizer(value)).toBe(expectation);
  });
}

describe('Test normalizer', () => {
  defaultTest('Crème  Brulée', 'creme.brulee');
  defaultTest('áàâäãéèêëíìîïóòôöõúùûüç', 'aaaaaeeeeiiiiooooouuuuc');
  defaultTest('!@#$%a¨&*()_-+=b[{10}]/?\\|,.c<>;:', 'a.b.10.c');
})
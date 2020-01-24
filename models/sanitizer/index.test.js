import { ObjectID } from 'mongodb';
import { SanitizerTypes, sanitize } from './index';

const defaultTest = (sanitizer, value, expectation) => {
  test(`Should value "${value}" be sanitizer by "${sanitizer.sanitizerName}" to "${expectation}"`, () => {
    const obj = { mainprop: value, propb: true, propn: 1, props: '-', propd: new Date(), propo: ObjectID() };
    sanitize(obj, { mainprop: sanitizer });
    expect(obj).toStrictEqual({ mainprop: expectation });
  });
}

describe('Test sanitizer', () => {
  defaultTest(SanitizerTypes.bool, 'true', true);
  defaultTest(SanitizerTypes.bool, 'True', true);
  defaultTest(SanitizerTypes.bool, 'TRUE', true);
  defaultTest(SanitizerTypes.bool, true, true);
  defaultTest(SanitizerTypes.bool, 'false', false);
  defaultTest(SanitizerTypes.bool, 'False', false);
  defaultTest(SanitizerTypes.bool, 'FALSE', false);
  defaultTest(SanitizerTypes.bool, false, false);
  defaultTest(SanitizerTypes.bool, '', undefined);

  defaultTest(SanitizerTypes.number, '0', 0);
  defaultTest(SanitizerTypes.number, 0, 0);
  defaultTest(SanitizerTypes.number, '1', 1);
  defaultTest(SanitizerTypes.number, 1, 1);
  defaultTest(SanitizerTypes.number, 'a', undefined);

  defaultTest(SanitizerTypes.string, '', '');
  defaultTest(SanitizerTypes.string, 'a', 'a');
  defaultTest(SanitizerTypes.string, true, undefined);
  defaultTest(SanitizerTypes.string, 1, undefined);
  defaultTest(SanitizerTypes.string, {}, undefined);

  const dateStr = "2000-01-02T03:04:05.006Z";
  const date = new Date(dateStr);

  defaultTest(SanitizerTypes.date, dateStr, date);
  defaultTest(SanitizerTypes.date, date, date);
  defaultTest(SanitizerTypes.date, 'a', undefined);
  defaultTest(SanitizerTypes.date, null, undefined);
  defaultTest(SanitizerTypes.date, 0, undefined);
  defaultTest(SanitizerTypes.date, undefined, undefined);
  defaultTest(SanitizerTypes.date, false, undefined);

  const idStr = '5d3be549d5fec323406af562';
  const id = ObjectID(idStr);

  defaultTest(SanitizerTypes.objectId, idStr, id);
  defaultTest(SanitizerTypes.objectId, id, id);
  defaultTest(SanitizerTypes.objectId, 'a', undefined);
  defaultTest(SanitizerTypes.objectId, null, undefined);
  defaultTest(SanitizerTypes.objectId, undefined, undefined);
  defaultTest(SanitizerTypes.objectId, false, undefined);
  defaultTest(SanitizerTypes.objectId, 0, undefined);
});
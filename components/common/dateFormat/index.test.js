import { dateFormat } from '.';

test('format d', () => {
  expect(dateFormat('2000-01-01T12:00:00.000Z', 'd')).toBe('1');
});

test('format dd', () => {
  expect(dateFormat('2000-01-01T12:00:00.000Z', 'dd')).toBe('01');
});

test('format ddd', () => {
  expect(dateFormat('2000-06-01T12:00:00.000Z', 'ddd')).toBe('qui');
  expect(dateFormat('2000-06-02T12:00:00.000Z', 'ddd')).toBe('sex');
  expect(dateFormat('2000-06-03T12:00:00.000Z', 'ddd')).toBe('sab');
  expect(dateFormat('2000-06-04T12:00:00.000Z', 'ddd')).toBe('dom');
  expect(dateFormat('2000-06-05T12:00:00.000Z', 'ddd')).toBe('seg');
  expect(dateFormat('2000-06-06T12:00:00.000Z', 'ddd')).toBe('ter');
  expect(dateFormat('2000-06-07T12:00:00.000Z', 'ddd')).toBe('qua');
});

test('format dddd', () => {
  expect(dateFormat('2000-06-01T12:00:00.000Z', 'dddd')).toBe('quinta-feira');
  expect(dateFormat('2000-06-02T12:00:00.000Z', 'dddd')).toBe('sexta-feira');
  expect(dateFormat('2000-06-03T12:00:00.000Z', 'dddd')).toBe('sábado');
  expect(dateFormat('2000-06-04T12:00:00.000Z', 'dddd')).toBe('domingo');
  expect(dateFormat('2000-06-05T12:00:00.000Z', 'dddd')).toBe('segunda-feira');
  expect(dateFormat('2000-06-06T12:00:00.000Z', 'dddd')).toBe('terça-feira');
  expect(dateFormat('2000-06-07T12:00:00.000Z', 'dddd')).toBe('quarta-feira');
});

test('format M', () => {
  expect(dateFormat('2000-01-15T12:00:00.000Z', 'M')).toBe('1');
});

test('format MM', () => {
  expect(dateFormat('2000-01-15T12:00:00.000Z', 'MM')).toBe('01');
});

test('format MMM', () => {
  expect(dateFormat('2000-01-15T12:00:00.000Z', 'MMM')).toBe('jan');
  expect(dateFormat('2000-02-15T12:00:00.000Z', 'MMM')).toBe('fev');
  expect(dateFormat('2000-03-15T12:00:00.000Z', 'MMM')).toBe('mar');
  expect(dateFormat('2000-04-15T12:00:00.000Z', 'MMM')).toBe('abr');
});

test('format MMMM', () => {
  expect(dateFormat('2000-01-15T12:00:00.000Z', 'MMMM')).toBe('janeiro');
  expect(dateFormat('2000-02-15T12:00:00.000Z', 'MMMM')).toBe('fevereiro');
  expect(dateFormat('2000-03-15T12:00:00.000Z', 'MMMM')).toBe('março');
  expect(dateFormat('2000-04-15T12:00:00.000Z', 'MMMM')).toBe('abril');
});

test('format y', () => {
  expect(dateFormat('2001-01-01T12:00:00.000Z', 'y')).toBe('1');
});

test('format yy', () => {
  expect(dateFormat('2001-01-01T12:00:00.000Z', 'yy')).toBe('01');
});

test('format yyy', () => {
  expect(dateFormat('2001-01-01T12:00:00.000Z', 'yyy')).toBe('2001');
});

test('format yyyy', () => {
  expect(dateFormat('2001-01-01T12:00:00.000Z', 'yyyy')).toBe('2001');
});

test('format yyyyy', () => {
  expect(dateFormat('2001-01-01T12:00:00.000Z', 'yyyyy')).toBe('02001');
});

test('format d/M/yy', () => {
  expect(dateFormat('2001-03-06T12:00:00.000Z', 'd/M/y')).toBe('6/3/1');
});

test('format d/M/yy', () => {
  expect(dateFormat('2001-03-06T12:00:00.000Z', 'd-M-y')).toBe('6-3-1');
});

test('format dd/MM/yyyy', () => {
  expect(dateFormat('2001-03-06T12:00:00.000Z', 'dd/MM/yyyy')).toBe('06/03/2001');
});

test('format dd-MM-yyyy', () => {
  expect(dateFormat('2001-03-06T12:00:00.000Z', 'dd-MM-yyyy')).toBe('06-03-2001');
});
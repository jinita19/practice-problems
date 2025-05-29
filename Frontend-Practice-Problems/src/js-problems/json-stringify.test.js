import jsonStringify from "./json-stringify";

test('should stringify null', () => {
  expect(jsonStringify(null)).toBe('null');
});

test('should stringify number', () => {
  expect(jsonStringify(42)).toBe('42');
});

test('should stringify boolean', () => {
  expect(jsonStringify(true)).toBe('true');
  expect(jsonStringify(false)).toBe('false');
});

test('should stringify strings with quotes escaped', () => {
  expect(jsonStringify('hello')).toBe('"hello"');
  expect(jsonStringify('"quoted"')).toBe('"\\\"quoted\\\""');
});

test('should stringify arrays', () => {
  expect(jsonStringify([1, 'a', null, true])).toBe('[1,"a",null,true]');
});

test('should stringify object with primitives', () => {
  expect(jsonStringify({ a: 1, b: 'hi', c: true })).toBe('{"a":1,"b":"hi","c":true}');
});

test('should stringify nested objects and arrays', () => {
  const input = { a: [1, { b: 2 }], c: "ok" };
  expect(jsonStringify(input)).toBe('{"a":[1,{"b":2}],"c":"ok"}');
});

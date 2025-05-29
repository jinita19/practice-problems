import deepClone from './deep-clone';

describe('deepClone', () => {
  it('should return primitives as is', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
    expect(deepClone(true)).toBe(true);
  });

  it('should deeply clone plain objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });

  it('should deeply clone arrays', () => {
    const arr = [1, [2, 3], { a: 4 }];
    const cloned = deepClone(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
    expect(cloned[2]).not.toBe(arr[2]);
  });

  it('should clone Date objects', () => {
    const date = new Date();
    const cloned = deepClone(date);

    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
    expect(cloned instanceof Date).toBe(true);
  });

  it('should clone RegExp objects', () => {
    const regex = /abc/gi;
    const cloned = deepClone(regex);

    expect(cloned).toEqual(regex);
    expect(cloned).not.toBe(regex);
    expect(cloned instanceof RegExp).toBe(true);
  });

  it('should handle circular references', () => {
    const obj = { name: 'self' };
    obj.self = obj;

    const cloned = deepClone(obj);
    expect(cloned).toEqual({ name: 'self', self: cloned });
    expect(cloned).not.toBe(obj);
    expect(cloned.self).toBe(cloned); // circular maintained
  });

  it('should handle deeply nested structures', () => {
    const nested = { a: { b: { c: [1, { d: 2 }] } } };
    const cloned = deepClone(nested);

    expect(cloned).toEqual(nested);
    expect(cloned).not.toBe(nested);
    expect(cloned.a.b.c[1]).not.toBe(nested.a.b.c[1]);
  });
});


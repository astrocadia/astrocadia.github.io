import { describe, expect, it } from 'vitest';
import {
  sortCompareObjectByOrderAndStringField,
  sortCompareObjectByStringField,
  sortCompareStringWithNumbers,
  sortCompareStringWithNumbersIgnoreCase,
} from './sort';

describe('Utils - sort', () => {
  it('sortCompareStringWithNumbers', () => {
    expect(sortCompareStringWithNumbers('sample100', 'sample2')).toBe(1);
    expect(sortCompareStringWithNumbers('sample100', 'sample100')).toBe(0);
    expect(sortCompareStringWithNumbers('sample2', 'sample100')).toBe(-1);
  });

  it('sortCompareStringWithNumbersIgnoreCase', () => {
    expect(sortCompareStringWithNumbersIgnoreCase('sample100', 'sample2')).toBe(
      1
    );
    expect(
      sortCompareStringWithNumbersIgnoreCase('sample100', 'sample100')
    ).toBe(0);
    expect(sortCompareStringWithNumbersIgnoreCase('sample2', 'sample100')).toBe(
      -1
    );

    expect(sortCompareStringWithNumbersIgnoreCase('sample100', 'Sample2')).toBe(
      1
    );
    expect(
      sortCompareStringWithNumbersIgnoreCase('sample100', 'Sample100')
    ).toBe(0);
    expect(sortCompareStringWithNumbersIgnoreCase('sample2', 'Sample100')).toBe(
      -1
    );
  });

  describe('sortCompareObjectByStringField', () => {
    const obj1 = { value: 'sample100' };
    const obj2 = { value: 'sample2' };
    const obj3 = { value: 'Sample100' };
    const obj4 = { value: 'Sample2' };

    it('should sort by field', () => {
      expect(sortCompareObjectByStringField('value')(obj1, obj2)).toBe(1);
      expect(sortCompareObjectByStringField('value')(obj1, obj1)).toBe(0);
      expect(sortCompareObjectByStringField('value')(obj2, obj1)).toBe(-1);

      expect(sortCompareObjectByStringField('value')(obj3, obj4)).toBe(1);
      expect(sortCompareObjectByStringField('value')(obj3, obj3)).toBe(0);
      expect(sortCompareObjectByStringField('value')(obj4, obj3)).toBe(-1);
    });

    it('should sort by field with ignoreCase', () => {
      expect(sortCompareObjectByStringField('value', true)(obj1, obj2)).toBe(1);
      expect(sortCompareObjectByStringField('value', true)(obj1, obj1)).toBe(0);
      expect(sortCompareObjectByStringField('value', true)(obj2, obj1)).toBe(
        -1
      );

      expect(sortCompareObjectByStringField('value', true)(obj3, obj4)).toBe(1);
      expect(sortCompareObjectByStringField('value', true)(obj3, obj3)).toBe(0);
      expect(sortCompareObjectByStringField('value', true)(obj4, obj3)).toBe(
        -1
      );
    });
  });

  describe('sortCompareObjectByOrderAndStringField', () => {
    interface TestObject {
      order?: number;
      value: string;
    }
    const sortFunction = sortCompareObjectByOrderAndStringField<TestObject>(
      'order',
      'value'
    );
    const sortFunctionIgnoreCase =
      sortCompareObjectByOrderAndStringField<TestObject>(
        'order',
        'value',
        true
      );

    it('should sort by "order" field', () => {
      const obj1: TestObject = { order: 1, value: 'Z' };
      const obj2: TestObject = { order: 2, value: 'A' };
      const objOrderUndefined: TestObject = { value: 'M' };

      expect(sortFunction(obj1, obj2)).toBe(-1);
      expect(sortFunction(obj1, obj1)).toBe(0);
      expect(sortFunction(obj2, obj1)).toBe(1);
      expect(sortFunction(obj1, objOrderUndefined)).toBe(-1);
      expect(sortFunction(objOrderUndefined, obj1)).toBe(1);
    });

    describe('should sort by "value" field if "order" fields are undefined', () => {
      const obj1 = { value: 'sample100' };
      const obj2 = { value: 'sample2' };
      const obj3 = { value: 'Sample100' };
      const obj4 = { value: 'Sample2' };

      it('should sort by field', () => {
        expect(sortFunction(obj1, obj2)).toBe(1);
        expect(sortFunction(obj1, obj1)).toBe(0);
        expect(sortFunction(obj2, obj1)).toBe(-1);

        expect(sortFunction(obj3, obj4)).toBe(1);
        expect(sortFunction(obj3, obj3)).toBe(0);
        expect(sortFunction(obj4, obj3)).toBe(-1);
      });

      it('should sort by field with ignoreCase', () => {
        expect(sortFunctionIgnoreCase(obj1, obj2)).toBe(1);
        expect(sortFunctionIgnoreCase(obj1, obj1)).toBe(0);
        expect(sortFunctionIgnoreCase(obj2, obj1)).toBe(-1);

        expect(sortFunctionIgnoreCase(obj3, obj4)).toBe(1);
        expect(sortFunctionIgnoreCase(obj3, obj3)).toBe(0);
        expect(sortFunctionIgnoreCase(obj4, obj3)).toBe(-1);
      });
    });

    describe('should sort by "value" field if "order" fields are the same', () => {
      const obj1 = { order: 1, value: 'sample100' };
      const obj2 = { order: 1, value: 'sample2' };
      const obj3 = { order: 1, value: 'Sample100' };
      const obj4 = { order: 1, value: 'Sample2' };

      it('should sort by field', () => {
        expect(sortFunction(obj1, obj2)).toBe(1);
        expect(sortFunction(obj1, obj1)).toBe(0);
        expect(sortFunction(obj2, obj1)).toBe(-1);

        expect(sortFunction(obj3, obj4)).toBe(1);
        expect(sortFunction(obj3, obj3)).toBe(0);
        expect(sortFunction(obj4, obj3)).toBe(-1);
      });

      it('should sort by field with ignoreCase', () => {
        expect(sortFunctionIgnoreCase(obj1, obj2)).toBe(1);
        expect(sortFunctionIgnoreCase(obj1, obj1)).toBe(0);
        expect(sortFunctionIgnoreCase(obj2, obj1)).toBe(-1);

        expect(sortFunctionIgnoreCase(obj3, obj4)).toBe(1);
        expect(sortFunctionIgnoreCase(obj3, obj3)).toBe(0);
        expect(sortFunctionIgnoreCase(obj4, obj3)).toBe(-1);
      });
    });
  });
});

import { describe, test, expect } from 'vitest';
import { formatJsonByLine } from './formatJsonByLine';

describe('formatJsonByLine', () => {
  test('should return the same string when not json and not wrapped in quotes', () => {
    const input = 'Hello, world!';
    const expected = 'Hello, world!';
    const result = formatJsonByLine(input);
    expect(result).toEqual(expected);
  });

  test('should return the same string when not json and wrapped in quotes', () => {
    const input = '"Hello, world!"';
    const expected = '"Hello, world!"';
    const result = formatJsonByLine(input);
    expect(result).toEqual(expected);
  });

  test('should return parsed json with double spaces when input is stringified simple json', () => {
    const input = '{"name":"John","age":30,"city":"New York"}';
    const result = formatJsonByLine(input);
    const expected = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;
    expect(result).toEqual(expected);
  });

  test('should return parsed json with double spaces when input is stringified complex json', () => {
    const input = `{ "name":"John", "age":30, "cars": { "car1":"Ford", "car2":"BMW", "car3":"Fiat" } }`;
    const result = formatJsonByLine(input);
    const expected = `{
  "name": "John",
  "age": 30,
  "cars": {
    "car1": "Ford",
    "car2": "BMW",
    "car3": "Fiat"
  }
}`;
    expect(result).toEqual(expected);
  });

  test('should return parsed json with double spaces when input is stringified complex json with array', () => {
    const input = `{ "name":"John", "age":30, "cars": { "car1":"Ford", "car2":"BMW", "car3":"Fiat" }, "children": ["Ann", "Billy"] }`;
    const result = formatJsonByLine(input);
    const expected = `{
  "name": "John",
  "age": 30,
  "cars": {
    "car1": "Ford",
    "car2": "BMW",
    "car3": "Fiat"
  },
  "children": [
    "Ann",
    "Billy"
  ]
}`;
    expect(result).toEqual(expected);
  });

  test('should return parsed json with double spaces when input is stringified complex json with nested array', () => {
    const input = `{ "name":"John", "age":30, "cars": { "car1":"Ford", "car2":"BMW", "car3":"Fiat" }, "children": ["Ann", "Billy", ["Charlie", "David"]] }`;
    const result = formatJsonByLine(input);
    const expected = `{
  "name": "John",
  "age": 30,
  "cars": {
    "car1": "Ford",
    "car2": "BMW",
    "car3": "Fiat"
  },
  "children": [
    "Ann",
    "Billy",
    [
      "Charlie",
      "David"
    ]
  ]
}`;
    expect(result).toEqual(expected);
  });

  test('should return parsed array with double spaces when input is stringified array', () => {
    const input = '["Ford", "BMW", "Fiat"]';
    const result = formatJsonByLine(input);
    const expected = `[
  "Ford",
  "BMW",
  "Fiat"
]`;
    expect(result).toEqual(expected);
  });

  test('should return parsed array with double spaces when input is stringified array with nested array', () => {
    const input = '["Ford", "BMW", "Fiat", ["Charlie", "David"]]';
    const result = formatJsonByLine(input);
    const expected = `[
  "Ford",
  "BMW",
  "Fiat",
  [
    "Charlie",
    "David"
  ]
]`;
    expect(result).toEqual(expected);
  });

  test('should return parsed array with double spaces when input is stringified array with nested object', () => {
    const input =
      '["Ford", "BMW", "Fiat", {"name":"John","age":30,"city":"New York"}]';
    const result = formatJsonByLine(input);
    const expected = `[
  "Ford",
  "BMW",
  "Fiat",
  {
    "name": "John",
    "age": 30,
    "city": "New York"
  }
]`;
    expect(result).toEqual(expected);
  });

  test('should return parsed object with double spaces when input is  object', () => {
    const input = { name: 'John', age: 30, city: 'New York' };
    const result = formatJsonByLine(input);
    const expected = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;
    expect(result).toEqual(expected);
  });

  test('should return parsed object with double spaces when input is  object with nested object', () => {
    const input = {
      name: 'John',
      age: 30,
      cars: { car1: 'Ford', car2: 'BMW', car3: 'Fiat' },
    };
    const result = formatJsonByLine(input);
    const expected = `{
  "name": "John",
  "age": 30,
  "cars": {
    "car1": "Ford",
    "car2": "BMW",
    "car3": "Fiat"
  }
}`;
    expect(result).toEqual(expected);
  });

  test('should return parsed object with double spaces when input is  object with nested array', () => {
    const input = {
      name: 'John',
      age: 30,
      children: ['Ann', 'Billy'],
    };
    const result = formatJsonByLine(input);
    const expected = `{
  "name": "John",
  "age": 30,
  "children": [
    "Ann",
    "Billy"
  ]
}`;
    expect(result).toEqual(expected);
  });

  test('should return parsed number when input is number', () => {
    const input = 123;
    const result = formatJsonByLine(input);
    const expected = '123';
    expect(result).toEqual(expected);
  });

  test('should return parsed boolean when input is boolean', () => {
    const input = true;
    const result = formatJsonByLine(input);
    const expected = 'true';
    expect(result).toEqual(expected);
  });

  test('should return parsed null when input is null', () => {
    const input = null;
    const result = formatJsonByLine(input);
    const expected = 'null';
    expect(result).toEqual(expected);
  });

  test('should return parsed undefined when input is undefined', () => {
    const input = undefined;
    const result = formatJsonByLine(input);
    const expected = 'undefined';
    expect(result).toEqual(expected);
  });
});

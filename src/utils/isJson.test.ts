import { describe, it, expect } from 'vitest';
import { isJson } from './isJson';

describe('isJson', () => {
  it('should return true for valid JSON string', () => {
    const jsonString = '{"name":"John","age":30,"city":"New York"}';
    expect(isJson(jsonString)).toBe(true);
  });

  it('should return false for invalid JSON string', () => {
    const invalidJsonString = '{"name":"John","age":30,"city":"New York"';
    expect(isJson(invalidJsonString)).toBe(false);
  });

  it('should return false for basic string', () => {
    const basicString = 'Hello, world!';
    expect(isJson(basicString)).toBe(false);
  });

  it('should return false for non-string input', () => {
    const number = 123;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(isJson(number)).toBe(false);
  });
});

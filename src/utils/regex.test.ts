import { describe, expect, it } from 'vitest';
import { escapeRegex } from './regex';

describe('escapeRegex', () => {
  it('should escape all special characters', () => {
    const str = 'abc.*+?^${}()|[]\\';
    const escaped = escapeRegex(str);
    expect(escaped).toBe('abc\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
  });
  it('should handle undefined', () => {
    const escaped = escapeRegex(undefined);
    expect(escaped).toBeUndefined();
  });
});

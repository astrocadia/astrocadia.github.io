import { describe, expect, it } from 'vitest';
import { humanize } from './humanizeDuration';

describe('Utils - humanizeDuration', () => {
  it('humanize', () => {
    expect(humanize(60 * 19 + 2)).toEqual('19m 02s');
    expect(humanize(60 * 60 * 2 + 19)).toEqual('02h 19s');
    expect(humanize(60 * 60 * 2 + 60 * 19)).toEqual('02h 19m');
  });
});

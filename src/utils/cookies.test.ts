import { describe, expect, it } from 'vitest';
import { getCookie, removeCookie } from './cookies';

// create unit tests to get and remove cookies
describe('cookies', () => {
  it('getCookie', () => {
    document.cookie = 'testCookie=testValue';
    const cookie = getCookie('testCookie');
    expect(cookie).toBe('testValue');
  });

  it('removeCookie', () => {
    document.cookie = 'testCookie=testValue';
    removeCookie('testCookie');
    const cookie = getCookie('testCookie');
    expect(cookie).toBeUndefined();
  });
});

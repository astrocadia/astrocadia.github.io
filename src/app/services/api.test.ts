import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getHTTPEndpoint, isLocalhostOrIP } from './api';

describe('api', () => {
  describe('isLocalhostOrIP', () => {
    it('should return true for localhost', () => {
      expect(isLocalhostOrIP('localhost')).toBe(true);
    });

    it('should return true for valid IPv4 addresses', () => {
      expect(isLocalhostOrIP('127.0.0.1')).toBe(true);
      expect(isLocalhostOrIP('192.168.1.1')).toBe(true);
      expect(isLocalhostOrIP('10.0.0.1')).toBe(true);
    });

    it('should return true for valid IPv6 addresses', () => {
      expect(isLocalhostOrIP('::1')).toBe(true);
      expect(isLocalhostOrIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(
        true
      );
    });

    it('should return false for invalid IP addresses', () => {
      expect(isLocalhostOrIP('not.an.ip.address')).toBe(false);
      expect(isLocalhostOrIP('256.0.0.1')).toBe(false);
      expect(isLocalhostOrIP('2001:0db8:85a3:0000:0000:8a2e:0370')).toBe(false);
    });
  });

  describe('getEndpoint', () => {
    beforeEach(() => {
      // Mock the window.location.hostname to always return 'localhost' for consistent testing
      Object.defineProperty(window, 'location', {
        value: {
          hostname: 'localhost',
        },
      });
    });

    afterEach(() => {
      // Reset the mocked window object after each test
      Object.defineProperty(window, 'location', {
        value: {
          hostname: 'localhost',
        },
        writable: true,
      });
    });

    it('should return correct endpoint for localhost with "auth" service', () => {
      expect(getHTTPEndpoint('auth')).toEqual('http://localhost:3000/api/v1');
    });

    it('should return correct endpoint for localhost with "strapi" service', () => {
      expect(getHTTPEndpoint('strapi')).toEqual('http://localhost:1337/api/v1');
    });

    it('should return correct endpoint for non-localhost environment with "org" service', () => {
      Object.defineProperty(window, 'location', {
        value: {
          hostname: 'example.com',
        },
      });

      expect(getHTTPEndpoint('org')).toEqual('https://example.com/api/v1');
    });

    it('should return correct endpoint for non-localhost including environment name with "reporting" service', () => {
      Object.defineProperty(window, 'location', {
        value: {
          hostname: 'beta-staging.gumband.com',
        },
      });

      expect(getHTTPEndpoint('reporting')).toEqual(
        'https://beta-staging.gumband.com/api/v1'
      );
    });
  });
});

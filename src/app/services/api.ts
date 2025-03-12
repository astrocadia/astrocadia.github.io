import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

let SERVICE_PORTS;

if (import.meta.env.VITE_ENVIRONMENT === 'tilt') {
  SERVICE_PORTS = {
    auth: 3000,
    exhibit: 3000,
    hardware: 3000,
    log: 3000,
    content: 3000,
    reporting: 3000,
    ws: 3000,
    event: 3000,
    org: 3000,
    presence: 3000,
    strapi: 1337,
  };
} else {
  SERVICE_PORTS = {
    auth: 3000,
    exhibit: 3006,
    hardware: 3012,
    log: 3007,
    content: 3008,
    reporting: 3003,
    ws: 3002,
    event: 3010,
    org: 3005,
    presence: 3011,
    strapi: 1337,
  };
}

const SERVICE_API_VERSION = {
  auth: 1,
  exhibit: 1,
  hardware: 2,
  log: 1,
  content: 1,
  reporting: 1,
  ws: 1,
  event: 1,
  org: 1,
  presence: 1,
  strapi: 1,
} as const;

type ServiceName = keyof typeof SERVICE_PORTS;

export const isLocalhostOrIP = (hostname: string): boolean => {
  if (hostname === 'localhost') {
    return true;
  }

  // check for IPv4 address
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(hostname)) {
    const octets = hostname.split('.');
    return octets.every((octet) => parseInt(octet, 10) <= 255);
  }

  // check for IPv6 address
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$/;
  if (ipv6Regex.test(hostname)) {
    // IPv6 address
    return true;
  }

  // not a valid IP address
  return false;
};

export const getHTTPEndpoint = (serviceName: ServiceName) => {
  const host = window.location.hostname;
  if (!isLocalhostOrIP(host)) {
    return `https://${host}/api/v${SERVICE_API_VERSION[serviceName]}`;
  }

  return `http://${host}:${SERVICE_PORTS[serviceName]}/api/v${SERVICE_API_VERSION[serviceName]}`;
};

export const getWSEndpoint = () => {
  const host = window.location.hostname;
  if (!isLocalhostOrIP(host)) {
    return `wss://${host}/api/v1/ws`;
  }

  return `ws://${host}:${SERVICE_PORTS.ws}/api/v1/ws`;
};

// Original lifted from https://redux-toolkit.js.org/rtk-query/usage/examples

const baseQuery = fetchBaseQuery({
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');

    return headers;
  },
});

// Eventually we can re-enable this, but we should probably only retry on 5xx errors
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    'Exhibit',
    'ExhibitScheduledEvents',
    'ExhibitManifest',
    'ExhibitUsers',
    'Project',
    'ProjectUsers',
    'User',
    'Workspace',
    'WorkspaceSummary',
    'WorkspaceUsers',
    'Hardware',
    'Software',
  ],
  endpoints: () => ({}),
});

enum ServiceName {
  'auth' = 'auth',
  'content' = 'content',
  'exhibit' = 'exhibit',
  'event' = 'event',
  'hardware' = 'hardware',
  'log' = 'log',
  'org' = 'org',
  'reporting' = 'reporting',
  'strapi' = 'strapi',
  'presence' = 'presence',
  'ws' = 'ws',
}

let ServicePort: Record<ServiceName, number>;

if (import.meta.env.VITE_ENVIRONMENT === 'tilt') {
  ServicePort = {
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
  ServicePort = {
    auth: 3000,
    exhibit: 3006,
    hardware: 3004,
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

/**
 * This class manages what API endpoints the SDK attempts to connect to
 */
export class EndpointManager {
  /**
   * Checks whether hostname is localhost or IP
   * @param hostname
   */
  static isLocalhostOrIP(hostname: string): boolean {
    if (hostname === 'localhost') {
      return true;
    }

    const hostnameToken = hostname.split('.');
    const isIP = hostnameToken.every((t) => !Number.isNaN(Number(t)));
    return isIP;
  }

  /**
   * Gets endpoint for microservices.
   *
   * @param {string} serviceName - microservice name (auth, exhibit, ...)
   * @return {string} endpoint
   */
  static getV1Endpoint(serviceName: ServiceName, version = 'v1') {
    const host = window.location.hostname;
    if (version === 'v1') {
      if (!EndpointManager.isLocalhostOrIP(host)) {
        return `https://${host}/api/v1`;
      }
      return `http://${host}:${ServicePort[serviceName]}/api/v1`;
    }

    throw new Error('Unknown API version');
  }

  /**
   * TODO: this is an assumption that happens to be correct right now
   * but the strapi URL could be at any arbitrary endpoint as defined by the
   * organization setting, and would typically be different organization to
   * organization. so this works on a dedicated cluster but not on a shared
   * cluster, where we would have to rollout a strapi deployment per org.
   */
  static getStrapiEndpoint(version = 'v1') {
    const host = window.location.hostname;
    if (version === 'v1') {
      if (!EndpointManager.isLocalhostOrIP(host)) {
        return `https://${host}/api/v1/strapi`;
      }
      return `http://${host}:${ServicePort.strapi}`;
    }

    throw new Error('Unknown API version');
  }

  /**
   * Get WebSocket address
   *
   * @return {string} ws endpoint
   */
  static getWSEndpoint(version = 'v1') {
    const host = window.location.hostname;
    if (version === 'v1') {
      if (!EndpointManager.isLocalhostOrIP(host)) {
        return `wss://${host}/api/v1/ws`;
      }
      return `ws://${host}:${ServicePort.ws}/api/v1/ws`;
    }

    throw new Error('Unknown API version');
  }
}

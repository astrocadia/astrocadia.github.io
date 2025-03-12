/// <reference types='vitest' />
/// <reference types="vite-plugin-svgr/client" />
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import svgr from 'vite-plugin-svgr';

let portNumber = 5173; // default port

if (process.env.VITE_ENVIRONMENT === 'tilt') {
  portNumber = 3000;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: portNumber,
  },
  preview: {
    port: portNumber,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});

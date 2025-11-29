import { defineConfig } from 'vite';

export default defineConfig({
  base: '/fighter-pilot/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
});
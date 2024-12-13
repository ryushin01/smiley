import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/smiley',
  plugins: [svgr(), react()],
  server: {
    open: true,
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});

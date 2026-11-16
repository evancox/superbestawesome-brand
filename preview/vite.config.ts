import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// A page that shows every token and component, for eyeballing changes before a release.
export default defineConfig({
  root: 'preview',
  plugins: [react(), tailwindcss()],
  build: { outDir: '../preview-dist', emptyOutDir: true },
});

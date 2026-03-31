import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// Налаштовуємо конфігурацію Vite для TypeScript
export default defineConfig({
  base: "/",
  plugins: [svgr(), react(), tailwindcss()],
});

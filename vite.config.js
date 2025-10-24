import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true // не ищет другой порт, если 3000 занят
  },
  preview: {
    port: 3000,
    strictPort: true
  }
});
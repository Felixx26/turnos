import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// En local, /api/* va a la API igual que hará el rewrite de Vercel en producción.
// Así el navegador ve un solo origen y la cookie de sesión funciona sin SameSite=None.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

// vite.config.ts or vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mounts the /api/*.js Vercel serverless functions during `vite dev`
// so local development matches production without needing `vercel dev`.
function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();

        const routeName = req.url.split('?')[0].replace('/api/', '');
        try {
          const mod = await server.ssrLoadModule(`/api/${routeName}.js`);
          await mod.default(req, res);
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(err?.message || err) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiDevMiddleware()],
  server: {
    host: '0.0.0.0', // This makes it accessible over the network
    port: 5173,       // Optional: choose your port
  },
})

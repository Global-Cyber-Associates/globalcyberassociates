// vite.config.ts or vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This makes it accessible over the network
    port: 5173,       // Optional: choose your port
  },
})

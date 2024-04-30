import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   server: {
      port: 8000,
      open: true,
      proxy: {
         '^/crises-socket-io/.*': {
            target: 'http://localhost:9600',
            ws: true,
            secure: false,
            changeOrigin: true,
         },
      }
   },
})

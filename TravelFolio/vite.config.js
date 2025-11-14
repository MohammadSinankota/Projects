import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: 'localhost',
    port: 5174,
    strictPort: false,
    hmr: {
      overlay: true,
      timeout: 30000, // Increase timeout for slow connections
    },
    // Add middleware mode to handle routing issues
    middlewareMode: false,
    // Disable file watching for node_modules to reduce resource usage
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**']
    }
  },
  // Add optimizeDeps to handle dependencies better
  optimizeDeps: {
    include: ['vue', 'vue-router']
  },
  // Add build options to handle assets properly
  build: {
    rollupOptions: {
      external: []
    }
  }
})
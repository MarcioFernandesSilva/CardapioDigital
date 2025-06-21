import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
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
    // Configurações de segurança para desenvolvimento
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  },
  build: {
    // Configurações de segurança para produção
    rollupOptions: {
      output: {
        // Gerar nomes de arquivo únicos para evitar cache
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Minificar código para dificultar engenharia reversa
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true
      }
    },
    // Gerar source maps apenas em desenvolvimento
    sourcemap: false
  },
  // Configurações de segurança adicionais
  define: {
    __VUE_PROD_DEVTOOLS__: false, // Desabilitar devtools em produção
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },
  // Base path para GitHub Pages (se necessário)
  // base: process.env.NODE_ENV === 'production' ? '/restaurante-cardapio/' : '/'
})

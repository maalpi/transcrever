import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Arquivo HTML do popup
        background: 'src/background.js',
        content: 'src/content.js'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      }
    },
    outDir: 'dist', // Pasta de saída
    assetsDir: ''   // Mantenha a estrutura de pasta limpa
  }
});

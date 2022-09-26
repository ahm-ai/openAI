import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 8000,
  // },
  build: {
      outDir: 'extension/dist',
      rollupOptions: {
          output: {
              entryFileNames: `${process.env.COMPONENT || 'custom'}.js`,
              assetFileNames: `[name].[ext]`
          }
      }
  }
})

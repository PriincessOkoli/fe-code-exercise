import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  build: {
    target: 'es2020',
    sourcemap: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  plugins: [
    tsconfigPaths({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
    }),
    react(),
    svgr(),
  ],
})

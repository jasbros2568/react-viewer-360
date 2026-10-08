import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Library build: ESM + CJS bundles, React is left for the consumer to provide.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'], output: { exports: 'named' } },
    sourcemap: true,
    emptyOutDir: true,
  },
})

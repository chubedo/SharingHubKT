/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as any,
  server: {
    port: 3001
  },
  test: {
    globals: true,
    environment: 'jsdom', // or 'jsdom', 'node'
    setupFiles: './tests/setup.js'
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})

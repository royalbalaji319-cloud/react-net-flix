import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",          // 🔥 MUST BE ROOT
  plugins: [react()],
  server: {
    port: 12000
  }
})

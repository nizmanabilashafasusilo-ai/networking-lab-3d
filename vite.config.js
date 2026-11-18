import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/networking-lab-3d/', // <-- Tambahkan baris ini
  server: {
    port: 3000,
    host: true
  }
})

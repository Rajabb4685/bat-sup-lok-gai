import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/bat-sup-lok-gai/",   // ← THIS IS IMPORTANT FOR RENDER
  plugins: [react()],
})

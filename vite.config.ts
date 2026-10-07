import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Serve api/mcp.ts at /mcp in dev, mirroring the Vercel rewrite in vercel.json.
      name: 'mcp-dev',
      configureServer(server) {
        server.middlewares.use('/mcp', async (req, res) => {
          const { default: handler } = await server.ssrLoadModule('/api/mcp.ts')
          await handler(req, res)
        })
      },
    },
  ],
})

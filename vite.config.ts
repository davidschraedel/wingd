import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexFile = path.resolve(distDir, 'index.html')
      const notFoundFile = path.resolve(distDir, '404.html')
      try {
        if (fs.existsSync(indexFile)) {
          fs.copyFileSync(indexFile, notFoundFile)
        }
      } catch (e) {
        console.warn('Could not copy index.html to 404.html', e)
      }
    },
  }
}

export default defineConfig({
  base: '/wingd/',
  plugins: [
    figmaAssetResolver(),
    copyIndexTo404(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})

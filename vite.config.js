import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { FontaineTransform } from 'fontaine';
import sitemapPlugin, { sitemapDevPlugin } from './scripts/sitemap-plugin.js';

export default defineConfig({
  plugins: [
    react(),
    // Emits sitemap.xml + robots.txt into dist/ at build time (from the routes
    // in src/seo/routes.js); the dev twin serves them live during `vite dev`.
    sitemapPlugin(),
    sitemapDevPlugin(),
    // Generates metric-matched fallback @font-faces (size-adjust / ascent- /
    // descent-override) for our self-hosted Sora + Outfit, computed from the
    // actual woff2 files, and appends them to the font-family stacks. Result:
    // the fallback text occupies the *same* box as the web font, so the swap
    // when the font finishes loading causes no layout shift (CLS).
    FontaineTransform.vite({
      fallbacks: ['Arial', 'system-ui', 'sans-serif'],
      // src url('/fonts/x.woff2') → <root>/public/fonts/x.woff2 on disk.
      resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
    }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
    viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
  ],
  server: {
    port: 5174,
    open: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Function form (not the object map): only assigns chunks for modules
        // actually present in the bundle. During vite-react-ssg's SSR/prerender
        // build react & friends are externalized, and Rollup rejects externals
        // in an object-form manualChunks — the function simply never sees them.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router')) return 'router';
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
            return 'react';
          }
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('lucide-react')) return 'icons';
          return 'vendor';
        },
      },
    },
  },
});

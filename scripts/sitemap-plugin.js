// Build-time generator for sitemap.xml + robots.txt.
//
// Registered in vite.config.js. It runs as part of `vite-react-ssg build`:
//   - closeBundle (client build only) writes both files into the final dist/.
//   - configureServer also serves them live during `vite dev`, so
//     http://localhost:5173/sitemap.xml works without a build.
//
// Routes come from src/seo/routes.js (the single source of truth). Because the
// Vite config graph is bundled/transformed by esbuild, importing the data files
// — including the JSX icon modules they pull in — works here even though a plain
// `node` script could not run that JSX.

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITE_URL, DISALLOW, getSitemapRoutes } from '../src/seo/routes.js';

const xmlEscape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function renderSitemap(routes) {
  const urls = routes
    .map(({ path, changefreq, priority, lastmod }) => {
      const lines = [`    <loc>${xmlEscape(SITE_URL + path)}</loc>`];
      if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
      if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
      if (priority != null) lines.push(`    <priority>${priority.toFixed(1)}</priority>`);
      return `  <url>\n${lines.join('\n')}\n  </url>`;
    })
    .join('\n');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${urls}\n` +
    '</urlset>\n'
  );
}

// AI / answer-engine crawlers we explicitly welcome, so they can index the
// site and cite it. Listing them by name is clearer than relying on the
// wildcard and future-proofs against any default-deny changes on their side.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI training/index
  'OAI-SearchBot', // ChatGPT search
  'ChatGPT-User', // ChatGPT browsing on user request
  'ClaudeBot', // Anthropic
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot', // Perplexity
  'Perplexity-User',
  'Google-Extended', // Gemini / Vertex AI
  'Applebot-Extended', // Apple Intelligence
  'CCBot', // Common Crawl (feeds many LLMs)
  'cohere-ai',
];

function renderRobots() {
  const disallow = DISALLOW.length
    ? DISALLOW.map((p) => `Disallow: ${p}`).join('\n')
    : 'Disallow:';

  const aiBlocks = AI_CRAWLERS.map(
    (ua) => `User-agent: ${ua}\nAllow: /\n${disallow}`,
  ).join('\n\n');

  return (
    '# UpWon — robots.txt\n' +
    '# AI summary for LLMs: /llms.txt and /llms-full.txt\n\n' +
    'User-agent: *\n' +
    'Allow: /\n' +
    `${disallow}\n\n` +
    `${aiBlocks}\n\n` +
    `Sitemap: ${SITE_URL}/sitemap.xml\n`
  );
}

export default function sitemapPlugin() {
  let outDir = 'dist';
  let isSsrBuild = false;

  return {
    name: 'upwon-sitemap',
    apply: 'build',

    configResolved(config) {
      outDir = config.build.outDir;
      // vite-react-ssg runs an SSR/prerender pass and a client pass through the
      // same config. Only emit on the client pass so we write once, to dist/.
      isSsrBuild = !!config.build.ssr;
    },

    closeBundle() {
      if (isSsrBuild) return;
      const routes = getSitemapRoutes();
      const dir = resolve(process.cwd(), outDir);
      writeFileSync(resolve(dir, 'sitemap.xml'), renderSitemap(routes), 'utf8');
      writeFileSync(resolve(dir, 'robots.txt'), renderRobots(), 'utf8');
      this.info?.(`sitemap.xml (${routes.length} urls) + robots.txt → ${outDir}/`);
    },
  };
}

// Dev-server twin: serves the same generated files at /sitemap.xml and
// /robots.txt during `vite dev`. Kept as a separate plugin (apply: 'serve') so
// the build plugin above can stay apply: 'build'.
export function sitemapDevPlugin() {
  return {
    name: 'upwon-sitemap-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml');
          res.end(renderSitemap(getSitemapRoutes()));
          return;
        }
        if (url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain');
          res.end(renderRobots());
          return;
        }
        next();
      });
    },
  };
}

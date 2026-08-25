import { lazy } from 'react';
import RootLayout from './components/layout/RootLayout.jsx';

// Route table for vite-react-ssg (react-router-dom data routes). Exported as a
// plain RouteRecord[] — ViteReactSSG (src/main.jsx) builds the router from it,
// prerenders every *static* path to HTML at build time (so the hero <h1> ships
// in the served markup → fast LCP) and hydrates on the client. Param routes
// (`:slug`) have no getStaticPaths, so they aren't prerendered; they still
// render client-side on navigation exactly as before.
//
// Each page stays code-split via `Component: lazy(...)` — one chunk per route,
// same as the previous `<Route element={lazy()} />` setup. RootLayout is the
// shared shell (Navbar/Footer/Outlet + the LazyMotion + ScrollToTop providers).

// Awareness
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const WhatIsUpwonPage = lazy(() => import('./pages/WhatIsUpwonPage.jsx'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage.jsx'));
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.jsx'));
const KnowledgebasePage = lazy(() => import('./pages/KnowledgebasePage.jsx'));

// Knowledgebase category + article are `:slug` routes prerendered via
// getStaticPaths. Same react-router `lazy` (not `Component: lazy(...)`) pattern
// as the product/industry microsites — see the note above productPageLazy.
const kbCategoryLazy = async () => ({
  Component: (await import('./pages/KnowledgebaseCategoryPage.jsx')).default,
});
const kbArticleLazy = async () => ({
  Component: (await import('./pages/KnowledgebaseArticlePage.jsx')).default,
});

// Consideration — Products & Industries microsites.
// These two are `:slug` routes prerendered via getStaticPaths (one record → many
// paths). They use react-router's native `lazy` property instead of
// `Component: lazy(...)`: vite-react-ssg's asset collector calls .toString() on a
// React.lazy payload, which throws once the shared lazy resolves on the 2nd+
// generated path (the resolved ES-module namespace has no .toString). A `lazy`
// function is always stringifiable, so multi-path prerender works — and it still
// code-splits one chunk per page exactly like the others.
const productPageLazy = async () => ({
  Component: (await import('./pages/ProductPage.jsx')).default,
});
// Each platform has its own dedicated page file (not the shared dynamic
// ProductPage). They render on the same /products/<slug> URLs via more-specific
// static routes below, so all existing links + SEO stay intact. ERP is fully
// custom; the other six wrap the shared engine with a fixed slug for now, and
// can diverge into custom sections later.
const erpPageLazy = async () => ({
  Component: (await import('./pages/ErpPage.jsx')).default,
});
const sfaDmsPageLazy = async () => ({
  Component: (await import('./pages/SfaDmsPage.jsx')).default,
});
const fmsPageLazy = async () => ({
  Component: (await import('./pages/FmsPage.jsx')).default,
});
const posPageLazy = async () => ({
  Component: (await import('./pages/PosPage.jsx')).default,
});
const hrmsPageLazy = async () => ({
  Component: (await import('./pages/HrmsPage.jsx')).default,
});
const wmsPageLazy = async () => ({
  Component: (await import('./pages/WmsPage.jsx')).default,
});
const vendorPortalPageLazy = async () => ({
  Component: (await import('./pages/VmsPage.jsx')).default,
});

// Platforms that have their own dedicated page/route. Excluded from the dynamic
// products/:slug fallback's prerender so paths don't clash.
const DEDICATED_PRODUCT_SLUGS = ['erp', 'sfa-dms', 'fms', 'pos', 'hrms', 'wms', 'vendor-portal'];
const industryPageLazy = async () => ({
  Component: (await import('./pages/IndustryPage.jsx')).default,
});
const IndustriesHubPage = lazy(() => import('./pages/IndustriesPage.jsx'));

// Evaluation
const ClientsHubPage = lazy(() => import('./pages/ClientsHubPage.jsx'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage.jsx'));
const RoiCalculatorPage = lazy(() => import('./pages/RoiCalculatorPage.jsx'));
const SelfEvaluationPage = lazy(() => import('./pages/SelfEvaluationPage.jsx'));
const VsSapPage = lazy(() => import('./pages/VsSapPage.jsx'));
const VsTallyPage = lazy(() => import('./pages/VsTallyPage.jsx'));
const VsOthersPage = lazy(() => import('./pages/VsOthersPage.jsx'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage.jsx'));
const NewsletterStoryPage = lazy(() => import('./pages/NewsletterStoryPage.jsx'));
const ImplementationPage = lazy(() => import('./pages/ImplementationPage.jsx'));
const WhyUpwonPage = lazy(() => import('./pages/WhyUpwonPage.jsx'));

// Decision
const DemoPage = lazy(() => import('./pages/DemoPage.jsx'));
const FreeAuditPage = lazy(() => import('./pages/FreeAuditPage.jsx'));
const PricingPage = lazy(() => import('./pages/PricingPage.jsx'));
const PartnersPage = lazy(() => import('./pages/PartnersPage.jsx'));
const ProposalPage = lazy(() => import('./pages/ProposalPage.jsx'));

// Platform legacy (keep for redirect target)
const PlatformPage = lazy(() => import('./pages/PlatformPage.jsx'));

// Support
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const CareersPage = lazy(() => import('./pages/CareersPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const LegalPage = lazy(() => import('./pages/LegalPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    // `entry` lets vite-react-ssg attribute the layout's styles correctly during
    // prerender, avoiding any pre-hydration flash of unstyled content.
    entry: 'src/components/layout/RootLayout.jsx',
    children: [
      // Awareness
      { index: true, Component: HomePage, entry: 'src/pages/HomePage.jsx' },
      { path: 'what-is-upwon', Component: WhatIsUpwonPage },
      { path: 'resources', Component: ResourcesPage },
      { path: 'blog', Component: BlogPage },
      { path: 'blog/:slug', Component: BlogPostPage },

      // Knowledgebase — hub + category + article (all prerendered).
      { path: 'knowledgebase', Component: KnowledgebasePage, entry: 'src/pages/KnowledgebasePage.jsx' },
      {
        path: 'knowledgebase/:categorySlug',
        lazy: kbCategoryLazy,
        entry: 'src/pages/KnowledgebaseCategoryPage.jsx',
        getStaticPaths: async () => {
          const { KB_CATEGORIES } = await import('./data/knowledgebase.js');
          return KB_CATEGORIES.map((c) => `/knowledgebase/${c.slug}`);
        },
      },
      {
        path: 'knowledgebase/:categorySlug/:articleSlug',
        lazy: kbArticleLazy,
        entry: 'src/pages/KnowledgebaseArticlePage.jsx',
        getStaticPaths: async () => {
          const { KB_ARTICLES } = await import('./data/knowledgebase.js');
          return KB_ARTICLES.map((a) => `/knowledgebase/${a.category}/${a.slug}`);
        },
      },

      // Products — 7 platforms, each with its own dedicated page file. Listed
      // before products/:slug so these static routes take precedence over the
      // dynamic fallback for their URLs.
      { path: 'platform', Component: PlatformPage },
      {
        path: 'products/erp',
        lazy: erpPageLazy,
        entry: 'src/pages/ErpPage.jsx',
        getStaticPaths: async () => ['/products/erp'],
      },
      {
        path: 'products/sfa-dms',
        lazy: sfaDmsPageLazy,
        entry: 'src/pages/SfaDmsPage.jsx',
        getStaticPaths: async () => ['/products/sfa-dms'],
      },
      {
        path: 'products/fms',
        lazy: fmsPageLazy,
        entry: 'src/pages/FmsPage.jsx',
        getStaticPaths: async () => ['/products/fms'],
      },
      {
        path: 'products/pos',
        lazy: posPageLazy,
        entry: 'src/pages/PosPage.jsx',
        getStaticPaths: async () => ['/products/pos'],
      },
      {
        path: 'products/hrms',
        lazy: hrmsPageLazy,
        entry: 'src/pages/HrmsPage.jsx',
        getStaticPaths: async () => ['/products/hrms'],
      },
      {
        path: 'products/wms',
        lazy: wmsPageLazy,
        entry: 'src/pages/WmsPage.jsx',
        getStaticPaths: async () => ['/products/wms'],
      },
      {
        path: 'products/vendor-portal',
        lazy: vendorPortalPageLazy,
        entry: 'src/pages/VmsPage.jsx',
        getStaticPaths: async () => ['/products/vendor-portal'],
      },
      {
        path: 'products/:slug',
        lazy: productPageLazy,
        entry: 'src/pages/ProductPage.jsx',
        // Dynamic fallback for any slug without its own dedicated page yet. The
        // seven dedicated platforms are excluded so their prerendered paths
        // don't clash. The data import is dynamic so modules.js stays OUT of the
        // eager client entry graph — getStaticPaths only runs in the SSG build.
        getStaticPaths: async () => {
          const { PLATFORM_MODULES } = await import('./data/modules.js');
          return PLATFORM_MODULES
            .filter((p) => !DEDICATED_PRODUCT_SLUGS.includes(p.slug))
            .map((p) => `/products/${p.slug}`);
        },
      },

      // Industries — 10 verticals
      { path: 'industries', Component: IndustriesHubPage },
      {
        path: 'industries/:slug',
        lazy: industryPageLazy,
        entry: 'src/pages/IndustryPage.jsx',
        // Same prerender treatment as the product microsites (see above).
        getStaticPaths: async () => {
          const { INDUSTRIES } = await import('./data/industries.js');
          return INDUSTRIES.map((i) => `/industries/${i.slug}`);
        },
      },

      // Evaluation
      { path: 'clients', Component: ClientsHubPage },
      { path: 'clients/:slug', Component: CaseStudyPage },
      { path: 'case-studies', Component: CaseStudyPage },
      { path: 'roi-calculator', Component: RoiCalculatorPage },
      { path: 'self-evaluation', Component: SelfEvaluationPage },
      { path: 'compare/upwon-vs-sap', Component: VsSapPage },
      { path: 'compare/upwon-vs-tally', Component: VsTallyPage },
      { path: 'compare/upwon-vs-others', Component: VsOthersPage },
      { path: 'newsletter', Component: NewsletterPage },
      { path: 'newsletter/:issueSlug', Component: NewsletterPage },
      { path: 'newsletter/:issueSlug/:storySlug', Component: NewsletterStoryPage },
      { path: 'implementation', Component: ImplementationPage },
      { path: 'why-upwon', Component: WhyUpwonPage },

      // Decision
      { path: 'demo', Component: DemoPage },
      { path: 'free-audit', Component: FreeAuditPage },
      { path: 'pricing', Component: PricingPage },
      { path: 'partners', Component: PartnersPage },
      { path: 'proposal', Component: ProposalPage },

      // Support
      { path: 'about', Component: AboutPage },
      { path: 'careers', Component: CareersPage },
      { path: 'contact', Component: ContactPage },
      { path: 'legal', Component: LegalPage },

      { path: '*', Component: NotFoundPage },
    ],
  },
];

export default routes;

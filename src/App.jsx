// import { lazy } from 'react';
// import RootLayout from './components/shared/RootLayout/RootLayout.jsx';

// // Route table for vite-react-ssg (react-router-dom data routes). Exported as a
// // plain RouteRecord[] — ViteReactSSG (src/main.jsx) builds the router from it,
// // prerenders every *static* path to HTML at build time (so the hero <h1> ships
// // in the served markup → fast LCP) and hydrates on the client. Param routes
// // (`:slug`) have no getStaticPaths, so they aren't prerendered; they still
// // render client-side on navigation exactly as before.
// //
// // Each page stays code-split via `Component: lazy(...)` — one chunk per route,
// // same as the previous `<Route element={lazy()} />` setup. RootLayout is the
// // shared shell (Navbar/Footer/Outlet + the LazyMotion + ScrollToTop providers).

// // Awareness
// const HomePage = lazy(() => import('./pages/Home/HomePage.jsx'));
// const WhatIsUpwonPage = lazy(() => import('./pages/WhatIsUpwon/WhatIsUpwonPage.jsx'));
// const ResourcesPage = lazy(() => import('./pages/Resources/ResourcesPage.jsx'));
// const BlogPage = lazy(() => import('./pages/Blog/BlogPage.jsx'));
// const BlogPostPage = lazy(() => import('./pages/BlogPost/BlogPostPage.jsx'));
// const KnowledgebasePage = lazy(() => import('./pages/Knowledgebase/KnowledgebasePage.jsx'));

// // Knowledgebase category + article are `:slug` routes prerendered via
// // getStaticPaths. Same react-router `lazy` (not `Component: lazy(...)`) pattern
// // as the product/industry microsites — see the note above productPageLazy.
// const kbCategoryLazy = async () => ({
//   Component: (await import('./pages/KnowledgebaseCategory/KnowledgebaseCategoryPage.jsx')).default,
// });
// const kbArticleLazy = async () => ({
//   Component: (await import('./pages/KnowledgebaseArticle/KnowledgebaseArticlePage.jsx')).default,
// });

// // Consideration — Products & Industries microsites.
// // These two are `:slug` routes prerendered via getStaticPaths (one record → many
// // paths). They use react-router's native `lazy` property instead of
// // `Component: lazy(...)`: vite-react-ssg's asset collector calls .toString() on a
// // React.lazy payload, which throws once the shared lazy resolves on the 2nd+
// // generated path (the resolved ES-module namespace has no .toString). A `lazy`
// // function is always stringifiable, so multi-path prerender works — and it still
// // code-splits one chunk per page exactly like the others.
// const productPageLazy = async () => ({
//   Component: (await import('./pages/Product/ProductPage.jsx')).default,
// });
// // Each platform has its own dedicated page file (not the shared dynamic
// // ProductPage). They render on the same /products/<slug> URLs via more-specific
// // static routes below, so all existing links + SEO stay intact. ERP is fully
// // custom; the other six wrap the shared engine with a fixed slug for now, and
// // can diverge into custom sections later.
// const erpPageLazy = async () => ({
//   Component: (await import('./pages/Erp/ErpPage.jsx')).default,
// });
// const sfaDmsPageLazy = async () => ({
//   Component: (await import('./pages/SfaDms/SfaDmsPage.jsx')).default,
// });
// const fmsPageLazy = async () => ({
//   Component: (await import('./pages/Fms/FmsPage.jsx')).default,
// });
// const posPageLazy = async () => ({
//   Component: (await import('./pages/Pos/PosPage.jsx')).default,
// });
// const hrmsPageLazy = async () => ({
//   Component: (await import('./pages/Hrms/HrmsPage.jsx')).default,
// });
// const wmsPageLazy = async () => ({
//   Component: (await import('./pages/Wms/WmsPage.jsx')).default,
// });
// const vendorPortalPageLazy = async () => ({
//   Component: (await import('./pages/Vms/VmsPage.jsx')).default,
// });

// // Platforms that have their own dedicated page/route. Excluded from the dynamic
// // products/:slug fallback's prerender so paths don't clash.
// const DEDICATED_PRODUCT_SLUGS = ['erp', 'sfa-dms', 'fms', 'pos', 'hrms', 'wms', 'vendor-portal'];
// const industryPageLazy = async () => ({
//   Component: (await import('./pages/Industry/IndustryPage.jsx')).default,
// });
// const IndustriesHubPage = lazy(() => import('./pages/Industries/IndustriesPage.jsx'));

// // Evaluation
// const ClientsHubPage = lazy(() => import('./pages/ClientsHub/ClientsHubPage.jsx'));
// const CaseStudyPage = lazy(() => import('./pages/CaseStudy/CaseStudyPage.jsx'));
// const RoiCalculatorPage = lazy(() => import('./pages/RoiCalculator/RoiCalculatorPage.jsx'));
// const SelfEvaluationPage = lazy(() => import('./pages/SelfEvaluation/SelfEvaluationPage.jsx'));
// const VsSapPage = lazy(() => import('./pages/VsSap/VsSapPage.jsx'));
// const VsTallyPage = lazy(() => import('./pages/VsTally/VsTallyPage.jsx'));
// const VsOthersPage = lazy(() => import('./pages/VsOthers/VsOthersPage.jsx'));
// const NewsletterPage = lazy(() => import('./pages/Newsletter/NewsletterPage.jsx'));
// const NewsletterStoryPage = lazy(() => import('./pages/NewsletterStory/NewsletterStoryPage.jsx'));
// const ImplementationPage = lazy(() => import('./pages/Implementation/ImplementationPage.jsx'));
// const WhyUpwonPage = lazy(() => import('./components/_unused/WhyUpwonPage.jsx'));

// // Decision
// const DemoPage = lazy(() => import('./pages/Demo/DemoPage.jsx'));
// const FreeAuditPage = lazy(() => import('./pages/FreeAudit/FreeAuditPage.jsx'));
// const PricingPage = lazy(() => import('./pages/Pricing/PricingPage.jsx'));
// const PartnersPage = lazy(() => import('./pages/Partners/PartnersPage.jsx'));
// const ProposalPage = lazy(() => import('./pages/Proposal/ProposalPage.jsx'));

// // Platform legacy (keep for redirect target)
// const PlatformPage = lazy(() => import('./pages/Platform/PlatformPage.jsx'));

// // Support
// const AboutPage = lazy(() => import('./pages/About/AboutPage.jsx'));
// const CareersPage = lazy(() => import('./pages/Careers/CareersPage.jsx'));
// const ContactPage = lazy(() => import('./pages/Contact/ContactPage.jsx'));
// const LegalPage = lazy(() => import('./pages/Legal/LegalPage.jsx'));
// const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage.jsx'));

// export const routes = [
//   {
//     path: '/',
//     element: <RootLayout />,
//     // `entry` lets vite-react-ssg attribute the layout's styles correctly during
//     // prerender, avoiding any pre-hydration flash of unstyled content.
//     entry: 'src/components/shared/RootLayout/RootLayout.jsx',
//     children: [
//       // Awareness
//       { index: true, Component: HomePage, entry: 'src/pages/Home/HomePage.jsx' },
//       { path: 'what-is-upwon', Component: WhatIsUpwonPage },
//       { path: 'resources', Component: ResourcesPage },
//       { path: 'blog', Component: BlogPage },
//       { path: 'blog/:slug', Component: BlogPostPage },

//       // Knowledgebase — hub + category + article (all prerendered).
//       { path: 'knowledgebase', Component: KnowledgebasePage, entry: 'src/pages/Knowledgebase/KnowledgebasePage.jsx' },
//       {
//         path: 'knowledgebase/:categorySlug',
//         lazy: kbCategoryLazy,
//         entry: 'src/pages/KnowledgebaseCategory/KnowledgebaseCategoryPage.jsx',
//         getStaticPaths: async () => {
//           const { KB_CATEGORIES } = await import('./data/knowledgebase.js');
//           return KB_CATEGORIES.map((c) => `/knowledgebase/${c.slug}`);
//         },
//       },
//       {
//         path: 'knowledgebase/:categorySlug/:articleSlug',
//         lazy: kbArticleLazy,
//         entry: 'src/pages/KnowledgebaseArticle/KnowledgebaseArticlePage.jsx',
//         getStaticPaths: async () => {
//           const { KB_ARTICLES } = await import('./data/knowledgebase.js');
//           return KB_ARTICLES.map((a) => `/knowledgebase/${a.category}/${a.slug}`);
//         },
//       },

//       // Products — 7 platforms, each with its own dedicated page file. Listed
//       // before products/:slug so these static routes take precedence over the
//       // dynamic fallback for their URLs.
//       { path: 'platform', Component: PlatformPage },
//       {
//         path: 'products/erp',
//         lazy: erpPageLazy,
//         entry: 'src/pages/Erp/ErpPage.jsx',
//         getStaticPaths: async () => ['/products/erp'],
//       },
//       {
//         path: 'products/sfa-dms',
//         lazy: sfaDmsPageLazy,
//         entry: 'src/pages/SfaDms/SfaDmsPage.jsx',
//         getStaticPaths: async () => ['/products/sfa-dms'],
//       },
//       {
//         path: 'products/fms',
//         lazy: fmsPageLazy,
//         entry: 'src/pages/Fms/FmsPage.jsx',
//         getStaticPaths: async () => ['/products/fms'],
//       },
//       {
//         path: 'products/pos',
//         lazy: posPageLazy,
//         entry: 'src/pages/Pos/PosPage.jsx',
//         getStaticPaths: async () => ['/products/pos'],
//       },
//       {
//         path: 'products/hrms',
//         lazy: hrmsPageLazy,
//         entry: 'src/pages/Hrms/HrmsPage.jsx',
//         getStaticPaths: async () => ['/products/hrms'],
//       },
//       {
//         path: 'products/wms',
//         lazy: wmsPageLazy,
//         entry: 'src/pages/Wms/WmsPage.jsx',
//         getStaticPaths: async () => ['/products/wms'],
//       },
//       {
//         path: 'products/vendor-portal',
//         lazy: vendorPortalPageLazy,
//         entry: 'src/pages/Vms/VmsPage.jsx',
//         getStaticPaths: async () => ['/products/vendor-portal'],
//       },
//       {
//         path: 'products/:slug',
//         lazy: productPageLazy,
//         entry: 'src/pages/Product/ProductPage.jsx',
//         // Dynamic fallback for any slug without its own dedicated page yet. The
//         // seven dedicated platforms are excluded so their prerendered paths
//         // don't clash. The data import is dynamic so modules.js stays OUT of the
//         // eager client entry graph — getStaticPaths only runs in the SSG build.
//         getStaticPaths: async () => {
//           const { PLATFORM_MODULES } = await import('./data/modules.js');
//           return PLATFORM_MODULES
//             .filter((p) => !DEDICATED_PRODUCT_SLUGS.includes(p.slug))
//             .map((p) => `/products/${p.slug}`);
//         },
//       },

//       // Industries — 10 verticals
//       { path: 'industries', Component: IndustriesHubPage },
//       {
//         path: 'industries/:slug',
//         lazy: industryPageLazy,
//         entry: 'src/pages/Industry/IndustryPage.jsx',
//         // Same prerender treatment as the product microsites (see above).
//         getStaticPaths: async () => {
//           const { INDUSTRIES } = await import('./data/industries.js');
//           return INDUSTRIES.map((i) => `/industries/${i.slug}`);
//         },
//       },

//       // Evaluation
//       { path: 'clients', Component: ClientsHubPage },
//       { path: 'clients/:slug', Component: CaseStudyPage },
//       { path: 'case-studies', Component: CaseStudyPage },
//       { path: 'roi-calculator', Component: RoiCalculatorPage },
//       { path: 'self-evaluation', Component: SelfEvaluationPage },
//       { path: 'compare/upwon-vs-sap', Component: VsSapPage },
//       { path: 'compare/upwon-vs-tally', Component: VsTallyPage },
//       { path: 'compare/upwon-vs-others', Component: VsOthersPage },
//       { path: 'newsletter', Component: NewsletterPage },
//       { path: 'newsletter/:issueSlug', Component: NewsletterPage },
//       { path: 'newsletter/:issueSlug/:storySlug', Component: NewsletterStoryPage },
//       { path: 'implementation', Component: ImplementationPage },
//       { path: 'why-upwon', Component: WhyUpwonPage },

//       // Decision
//       { path: 'demo', Component: DemoPage },
//       { path: 'free-audit', Component: FreeAuditPage },
//       { path: 'pricing', Component: PricingPage },
//       { path: 'partners', Component: PartnersPage },
//       { path: 'proposal', Component: ProposalPage },

//       // Support
//       { path: 'about', Component: AboutPage },
//       { path: 'careers', Component: CareersPage },
//       { path: 'contact', Component: ContactPage },
//       { path: 'legal', Component: LegalPage },

//       { path: '*', Component: NotFoundPage },
//     ],
//   },
// ];

// export default routes;







import { lazy } from 'react';
import RootLayout from './components/shared/RootLayout/RootLayout.jsx';

// Route table for vite-react-ssg (react-router-dom data routes). Exported as a
// plain RouteRecord[] — ViteReactSSG (src/main.jsx) builds the router from it,
// prerenders every static path to HTML at build time and hydrates on the client.

// Each page stays code-split via Component: lazy(...) — one chunk per route.
// RootLayout is the shared shell (Navbar/Footer/Outlet + providers).

// ============================================================
// Awareness
// ============================================================

const HomePage = lazy(() => import('./pages/Home/HomePage.jsx'));
const WhatIsUpwonPage = lazy(() => import('./pages/WhatIsUpwon/WhatIsUpwonPage.jsx'));
const ResourcesPage = lazy(() => import('./pages/Resources/ResourcesPage.jsx'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage.jsx'));
const BlogPostPage = lazy(() => import('./pages/BlogPost/BlogPostPage.jsx'));
const KnowledgebasePage = lazy(() => import('./pages/Knowledgebase/KnowledgebasePage.jsx'));

// ============================================================
// Knowledgebase
// ============================================================

const kbCategoryLazy = async () => ({
  Component: (await import('./pages/KnowledgebaseCategory/KnowledgebaseCategoryPage.jsx')).default,
});

const kbArticleLazy = async () => ({
  Component: (await import('./pages/KnowledgebaseArticle/KnowledgebaseArticlePage.jsx')).default,
});

// ============================================================
// Products
// ============================================================

const productPageLazy = async () => ({
  Component: (await import('./pages/Product/ProductPage.jsx')).default,
});

// Dedicated Product Pages

const erpPageLazy = async () => ({
  Component: (await import('./pages/Erp/ErpPage.jsx')).default,
});

const sfaDmsPageLazy = async () => ({
  Component: (await import('./pages/SfaDms/SfaDmsPage.jsx')).default,
});

const fmsPageLazy = async () => ({
  Component: (await import('./pages/Fms/FmsPage.jsx')).default,
});

const posPageLazy = async () => ({
  Component: (await import('./pages/Pos/PosPage.jsx')).default,
});

const hrmsPageLazy = async () => ({
  Component: (await import('./pages/Hrms/HrmsPage.jsx')).default,
});

const wmsPageLazy = async () => ({
  Component: (await import('./pages/Wms/WmsPage.jsx')).default,
});

const vendorPortalPageLazy = async () => ({
  Component: (await import('./pages/Vms/VmsPage.jsx')).default,
});

// Platforms that have their own dedicated page/route.
const DEDICATED_PRODUCT_SLUGS = [
  'erp',
  'sfa-dms',
  'fms',
  'pos',
  'hrms',
  'wms',
  'vendor-portal',
];

// ============================================================
// Industries
// ============================================================

// Shared dynamic Industry page
const industryPageLazy = async () => ({
  Component: (await import('./pages/Industry/IndustryPage.jsx')).default,
});

// Industries Hub
const IndustriesHubPage = lazy(() => import('./pages/Industries/IndustriesPage.jsx'));

// Dedicated Industry Pages

const bakeryConfectioneryPageLazy = async () => ({
  Component: (
    await import('./pages/BakeryandConfectionery/BakeryandConfectionery.jsx')
  ).default,
});

const fmcgDistributionPageLazy = async () => ({
  Component: (
    await import('./pages/FmcgDistribution/FmcgDistribution.jsx')
  ).default,
});

const sweetsNamkeenPageLazy = async () => ({
  Component: (
    await import('./pages/SweetsAndNamkeen/SweetsAndNamkeen.jsx')
  ).default,
});

const foodProcessingPageLazy = async () => ({
  Component: (
    await import('./pages/FoodProcessing/FoodProcessing.jsx')
  ).default,
});

const nonFoodFmcgPageLazy = async () => ({
  Component: (
    await import('./pages/NonFoodFmcg/NonFoodFmcg.jsx')
  ).default,
});

const dairyIceCreamPageLazy = async () => ({
  Component: (
    await import('./pages/DairyAndIceCream/DairyAndIceCream.jsx')
  ).default,
});

const qsrFranchisePageLazy = async () => ({
  Component: (
    await import('./pages/QsrFranchise/QsrFranchise.jsx')
  ).default,
});

const spicesAgroPageLazy = async () => ({
  Component: (
    await import('./pages/SpicesAgro/SpicesAgro.jsx')
  ).default,
});

const beveragesPageLazy = async () => ({
  Component: (
    await import('./pages/Beverages/Beverages.jsx')
  ).default,
});

const engineeringPageLazy = async () => ({
  Component: (
    await import('./pages/EngineeringManufacturing/EngineeringManufacturing.jsx')
  ).default,
});

// Industries that have their own dedicated page/route.
const DEDICATED_INDUSTRY_SLUGS = [
  'bakery-and-confectionery',
   'fmcg-distribution',
   'sweets-namkeen',
   'food-processing',
   'non-food-fmcg',
   'dairy',
   'qsr-franchise',
   'spices-agro',
   'beverage',
   'engineering-manufacturing',
];

// ============================================================
// Evaluation
// ============================================================

const ClientsHubPage = lazy(() => import('./pages/ClientsHub/ClientsHubPage.jsx'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudy/CaseStudyPage.jsx'));
const RoiCalculatorPage = lazy(() => import('./pages/RoiCalculator/RoiCalculatorPage.jsx'));
const SelfEvaluationPage = lazy(() => import('./pages/SelfEvaluation/SelfEvaluationPage.jsx'));
const VsSapPage = lazy(() => import('./pages/VsSap/VsSapPage.jsx'));
const VsTallyPage = lazy(() => import('./pages/VsTally/VsTallyPage.jsx'));
const VsOthersPage = lazy(() => import('./pages/VsOthers/VsOthersPage.jsx'));
const NewsletterPage = lazy(() => import('./pages/Newsletter/NewsletterPage.jsx'));
const NewsletterStoryPage = lazy(() => import('./pages/NewsletterStory/NewsletterStoryPage.jsx'));
const ImplementationPage = lazy(() => import('./pages/Implementation/ImplementationPage.jsx'));
// Rebuilt Why UpWon page. The previous version is still on disk at
// ./pages/WhyUpwonPage.jsx if any of it needs to be brought back.
const WhyUpwon = lazy(() => import('./pages/WhyUpwon/WhyUpwon.jsx'));

// ============================================================
// Decision
// ============================================================

const DemoPage = lazy(() => import('./pages/Demo/DemoPage.jsx'));
const FreeAuditPage = lazy(() => import('./pages/FreeAudit/FreeAuditPage.jsx'));
const PricingPage = lazy(() => import('./pages/Pricing/PricingPage.jsx'));
const PartnersPage = lazy(() => import('./pages/Partners/PartnersPage.jsx'));
const ProposalPage = lazy(() => import('./pages/Proposal/ProposalPage.jsx'));

// ============================================================
// Platform Legacy
// ============================================================

const PlatformPage = lazy(() => import('./pages/Platform/PlatformPage.jsx'));

// ============================================================
// Support
// ============================================================

const AboutPage = lazy(() => import('./pages/About/AboutPage.jsx'));
const CareersPage = lazy(() => import('./pages/Careers/CareersPage.jsx'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage.jsx'));
const LegalPage = lazy(() => import('./pages/Legal/LegalPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage.jsx'));

// ============================================================
// Routes
// ============================================================

export const routes = [
  {
    path: '/',
    element: <RootLayout />,

    // Entry lets vite-react-ssg attribute the layout's styles correctly.
    entry: 'src/components/shared/RootLayout/RootLayout.jsx',

    children: [

      // ======================================================
      // Awareness
      // ======================================================

      {
        index: true,
        Component: HomePage,
        entry: 'src/pages/Home/HomePage.jsx',
      },

      {
        path: 'what-is-upwon',
        Component: WhatIsUpwonPage,
      },

      {
        path: 'resources',
        Component: ResourcesPage,
      },

      {
        path: 'blog',
        Component: BlogPage,
      },

      {
        path: 'blog/:slug',
        Component: BlogPostPage,
      },

      // ======================================================
      // Knowledgebase
      // ======================================================

      {
        path: 'knowledgebase',
        Component: KnowledgebasePage,
        entry: 'src/pages/Knowledgebase/KnowledgebasePage.jsx',
      },

      {
        path: 'knowledgebase/:categorySlug',
        lazy: kbCategoryLazy,
        entry: 'src/pages/KnowledgebaseCategory/KnowledgebaseCategoryPage.jsx',

        getStaticPaths: async () => {
          const { KB_CATEGORIES } = await import(
            './data/knowledgebase.js'
          );

          return KB_CATEGORIES.map(
            (category) => `/knowledgebase/${category.slug}`
          );
        },
      },

      {
        path: 'knowledgebase/:categorySlug/:articleSlug',
        lazy: kbArticleLazy,
        entry: 'src/pages/KnowledgebaseArticle/KnowledgebaseArticlePage.jsx',

        getStaticPaths: async () => {
          const { KB_ARTICLES } = await import(
            './data/knowledgebase.js'
          );

          return KB_ARTICLES.map(
            (article) =>
              `/knowledgebase/${article.category}/${article.slug}`
          );
        },
      },

      // ======================================================
      // Products
      // ======================================================

      {
        path: 'platform',
        Component: PlatformPage,
      },

      {
        path: 'products/erp',
        lazy: erpPageLazy,
        entry: 'src/pages/Erp/ErpPage.jsx',
        getStaticPaths: async () => ['/products/erp'],
      },

      {
        path: 'products/sfa-dms',
        lazy: sfaDmsPageLazy,
        entry: 'src/pages/SfaDms/SfaDmsPage.jsx',
        getStaticPaths: async () => ['/products/sfa-dms'],
      },

      {
        path: 'products/fms',
        lazy: fmsPageLazy,
        entry: 'src/pages/Fms/FmsPage.jsx',
        getStaticPaths: async () => ['/products/fms'],
      },

      {
        path: 'products/pos',
        lazy: posPageLazy,
        entry: 'src/pages/Pos/PosPage.jsx',
        getStaticPaths: async () => ['/products/pos'],
      },

      {
        path: 'products/hrms',
        lazy: hrmsPageLazy,
        entry: 'src/pages/Hrms/HrmsPage.jsx',
        getStaticPaths: async () => ['/products/hrms'],
      },

      {
        path: 'products/wms',
        lazy: wmsPageLazy,
        entry: 'src/pages/Wms/WmsPage.jsx',
        getStaticPaths: async () => ['/products/wms'],
      },

      {
        path: 'products/vendor-portal',
        lazy: vendorPortalPageLazy,
        entry: 'src/pages/Vms/VmsPage.jsx',
        getStaticPaths: async () => ['/products/vendor-portal'],
      },

      // Dynamic Product fallback
      {
        path: 'products/:slug',
        lazy: productPageLazy,
        entry: 'src/pages/Product/ProductPage.jsx',

        getStaticPaths: async () => {
          const { PLATFORM_MODULES } = await import(
            './data/modules.js'
          );

          return PLATFORM_MODULES
            .filter(
              (product) =>
                !DEDICATED_PRODUCT_SLUGS.includes(product.slug)
            )
            .map(
              (product) => `/products/${product.slug}`
            );
        },
      },

      // ======================================================
      // Industries
      // ======================================================

      {
        path: 'industries',
        Component: IndustriesHubPage,
      },

      // ------------------------------------------------------
      // Dedicated Bakery & Confectionery Page
      // ------------------------------------------------------

      {
        path: 'industries/bakery-and-confectionery',
        lazy: bakeryConfectioneryPageLazy,
        entry: 'src/pages/BakeryandConfectionery/BakeryandConfectionery.jsx',
        getStaticPaths: async () => [
          '/industries/bakery-and-confectionery',
        ],
      },

      {
        path: 'industries/fmcg-distribution',
        lazy: fmcgDistributionPageLazy,
        entry: 'src/pages/FmcgDistribution/FmcgDistribution.jsx',
        getStaticPaths: async () => [
          '/industries/fmcg-distribution',
        ],
      },

      {
        path: 'industries/sweets-namkeen',
        lazy: sweetsNamkeenPageLazy,
        entry: 'src/pages/SweetsAndNamkeen/SweetsAndNamkeen.jsx',
        getStaticPaths: async () => [
          '/industries/sweets-namkeen',
        ],
      },

      {
        path: 'industries/food-processing',
        lazy: foodProcessingPageLazy,
        entry: 'src/pages/FoodProcessing/FoodProcessing.jsx',
        getStaticPaths: async () => [
          '/industries/food-processing',
        ],
      },

      {
        path: 'industries/non-food-fmcg',
        lazy: nonFoodFmcgPageLazy,
        entry: 'src/pages/NonFoodFmcg/NonFoodFmcg.jsx',
        getStaticPaths: async () => [
          '/industries/non-food-fmcg',
        ],
      },

      {
        path: 'industries/dairy',
        lazy: dairyIceCreamPageLazy,
        entry: 'src/pages/DairyAndIceCream/DairyAndIceCream.jsx',
        getStaticPaths: async () => [
          '/industries/dairy',
        ],
      },

      {
        path: 'industries/qsr-franchise',
        lazy: qsrFranchisePageLazy,
        entry: 'src/pages/QsrFranchise/QsrFranchise.jsx',
        getStaticPaths: async () => [
          '/industries/qsr-franchise',
        ],
      },

      {
        path: 'industries/spices-agro',
        lazy: spicesAgroPageLazy,
        entry: 'src/pages/SpicesAgro/SpicesAgro.jsx',
        getStaticPaths: async () => [
          '/industries/spices-agro',
        ],
      },

      {
        path: 'industries/beverage',
        lazy: beveragesPageLazy,
        entry: 'src/pages/Beverages/Beverages.jsx',
        getStaticPaths: async () => [
          '/industries/beverage',
        ],
      },

      {
        path: 'industries/engineering-manufacturing',
        lazy: engineeringPageLazy,
        entry: 'src/pages/EngineeringManufacturing/EngineeringManufacturing.jsx',
        getStaticPaths: async () => [
          '/industries/engineering-manufacturing',
        ],
      },



      // ------------------------------------------------------
      // Dynamic fallback for remaining Industries
      // ------------------------------------------------------

      {
        path: 'industries/:slug',
        lazy: industryPageLazy,
        entry: 'src/pages/Industry/IndustryPage.jsx',

        getStaticPaths: async () => {
          const { INDUSTRIES } = await import(
            './data/industries.js'
          );

          return INDUSTRIES
            .filter(
              (industry) =>
                !DEDICATED_INDUSTRY_SLUGS.includes(industry.slug)
            )
            .map(
              (industry) => `/industries/${industry.slug}`
            );
        },
      },

      // ======================================================
      // Evaluation
      // ======================================================

      {
        path: 'clients',
        Component: ClientsHubPage,
      },

      {
        path: 'clients/:slug',
        Component: CaseStudyPage,
      },

      {
        path: 'case-studies',
        Component: CaseStudyPage,
      },

      {
        path: 'roi-calculator',
        Component: RoiCalculatorPage,
      },

      {
        path: 'self-evaluation',
        Component: SelfEvaluationPage,
      },

      {
        path: 'compare/upwon-vs-sap',
        Component: VsSapPage,
      },

      {
        path: 'compare/upwon-vs-tally',
        Component: VsTallyPage,
      },

      {
        path: 'compare/upwon-vs-others',
        Component: VsOthersPage,
      },

      {
        path: 'newsletter',
        Component: NewsletterPage,
      },

      {
        path: 'newsletter/:issueSlug',
        Component: NewsletterPage,
      },

      {
        path: 'newsletter/:issueSlug/:storySlug',
        Component: NewsletterStoryPage,
      },

      {
        path: 'implementation',
        Component: ImplementationPage,
      },

      {
        path: 'why-upwon',
        Component: WhyUpwon,
      },

      // ======================================================
      // Decision
      // ======================================================

      {
        path: 'demo',
        Component: DemoPage,
      },

      {
        path: 'free-audit',
        Component: FreeAuditPage,
      },

      {
        path: 'pricing',
        Component: PricingPage,
      },

      {
        path: 'partners',
        Component: PartnersPage,
      },

      {
        path: 'proposal',
        Component: ProposalPage,
      },

      // ======================================================
      // Support
      // ======================================================

      {
        path: 'about',
        Component: AboutPage,
      },

      {
        path: 'careers',
        Component: CareersPage,
      },

      {
        path: 'contact',
        Component: ContactPage,
      },

      {
        path: 'legal',
        Component: LegalPage,
      },

      // ======================================================
      // 404
      // ======================================================

      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
];

export default routes;
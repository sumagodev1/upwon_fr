# UpWon — Enterprise OS for Food & FMCG

High-end enterprise SaaS website prototype for **UpWon**, the Enterprise Operating System for Food & FMCG businesses.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS** with a custom enterprise palette (navy / orange / soft)
- **Framer Motion** for section reveals and micro-interactions
- **Lucide React** for icons
- **React Router v6** for routing

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5174`.

## Pages

| Route | File |
| --- | --- |
| `/` | `src/pages/HomePage.jsx` |
| `/platform` | `src/pages/PlatformPage.jsx` |
| `/industries` | `src/pages/IndustriesPage.jsx` |
| `/case-studies` | `src/pages/CaseStudyPage.jsx` |
| `/implementation` | `src/pages/ImplementationPage.jsx` |
| `/contact` | `src/pages/ContactPage.jsx` |

## Project Structure

```
src/
├── assets/
├── components/
│    ├── common/     # Logo, ScrollToTop, generic shared
│    ├── layout/     # Navbar, Footer, RootLayout
│    ├── sections/   # Page sections (Hero, Metrics, etc.)
│    └── ui/         # Buttons, headings, containers, counters
├── data/            # Static content (modules, industries, case study)
├── hooks/           # useCountUp
├── pages/           # Top-level route components
├── styles/          # index.css (Tailwind layer + global)
├── App.jsx
└── main.jsx
```

## Build

```bash
npm run build
npm run preview
```

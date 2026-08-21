import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App.jsx';
import './styles/fonts.css';
import './styles/index.css';

// vite-react-ssg owns the router (createBrowserRouter on the client, a static
// handler at build time), so there's no <BrowserRouter> here anymore. The
// LazyMotion + StrictMode + ScrollToTop providers that used to wrap the app in
// this file now live inside RootLayout — the shared layout element for every
// route — so they wrap the whole tree on both server prerender and client
// hydration. `createRoot` is the client entry vite-react-ssg looks for.
export const createRoot = ViteReactSSG({ routes });

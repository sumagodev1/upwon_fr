import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import Seo from '../components/common/Seo.jsx';

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-white pt-32 pb-20">
      <Seo title="Page not found" noindex />
      <div className="absolute inset-0 grid-bg-light opacity-60" />

      <Container className="relative text-center">
        <p className="font-display text-[8rem] font-bold leading-none gradient-text-orange md:text-[12rem]">
          404
        </p>
        <h1 className="mt-4 h-display text-3xl text-navy-950 md:text-4xl">
          Operational route not found.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-navy-700">
          The page you're looking for doesn't exist on UpWon. Head back to home or pick a route below.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link to="/platform" className="btn-secondary">
            Explore Platform
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

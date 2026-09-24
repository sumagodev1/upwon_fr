import { useEffect, useState } from 'react';
import ProductPage from '../Product/ProductPage.jsx';
import {
  fetchSfaCtaSection,
  fetchSfaAlternativesSection,
  fetchSfaEstablishersSection,
  fetchSfaFaqSection,
  fetchSfaHeroSlides,
  fetchSfaOutcomesSection,
  fetchSfaPackagesSection,
  fetchSfaProofSection,
  fetchSfaVideoSection,
} from '../../lib/sfaDmsPage.js';

/**
 * Dedicated SFA-DMS page. Renders the shared ProductPage engine with the
 * sfa-dms slug fixed, so this platform can diverge into custom sections later
 * (like ErpPage did) without affecting the others.
 *
 * The nine CMS-backed sections are read here rather than inside ProductPage:
 * that engine serves seven products, and only this one has a CMS page behind
 * it. The other six pass nothing and render from data/modules.js exactly as
 * they always have.
 *
 * Each section falls back on its own. An empty slide list keeps the built-in
 * slider; a null FAQ, proof band, video, adoption path, comparison grid,
 * customer stories, establishers band or closing band keeps the copy the page
 * ships. The fetches are guarded inside lib/sfaDmsPage.js, so the SSG build
 * never makes them and the prerendered HTML stays the site's own content.
 */
export default function SfaDmsPage() {
  const [heroSlides, setHeroSlides] = useState(null);
  const [faq, setFaq] = useState(null);
  const [proof, setProof] = useState(null);
  const [video, setVideo] = useState(null);
  const [packages, setPackages] = useState(null);
  const [establishers, setEstablishers] = useState(null);
  const [alternatives, setAlternatives] = useState(null);
  const [outcomes, setOutcomes] = useState(null);
  const [cta, setCta] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchSfaHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setHeroSlides(slides);
    });
    fetchSfaFaqSection().then((section) => {
      if (!cancelled && section) setFaq(section);
    });
    fetchSfaProofSection().then((section) => {
      if (!cancelled && section) setProof(section);
    });
    fetchSfaVideoSection().then((section) => {
      if (!cancelled && section) setVideo(section);
    });
    fetchSfaPackagesSection().then((section) => {
      if (!cancelled && section) setPackages(section);
    });
    fetchSfaEstablishersSection().then((section) => {
      if (!cancelled && section) setEstablishers(section);
    });
    fetchSfaAlternativesSection().then((section) => {
      if (!cancelled && section) setAlternatives(section);
    });
    fetchSfaOutcomesSection().then((section) => {
      if (!cancelled && section) setOutcomes(section);
    });
    fetchSfaCtaSection().then((section) => {
      if (!cancelled && section) setCta(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProductPage
      slug="sfa-dms"
      hideBreadcrumb
      heroSlidesOverride={heroSlides}
      faqOverride={faq}
      proofOverride={proof}
      videoOverride={video}
      packagesOverride={packages}
      establishersOverride={establishers}
      alternativesOverride={alternatives}
      outcomesOverride={outcomes}
      ctaOverride={cta}
    />
  );
}

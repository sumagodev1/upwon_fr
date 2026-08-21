import ProductPage from './ProductPage.jsx';

// Dedicated SFA-DMS page. Renders the shared ProductPage engine with the
// sfa-dms slug fixed, so this platform can diverge into custom sections later
// (like ErpPage did) without affecting the others.
export default function SfaDmsPage() {
  return <ProductPage slug="sfa-dms" hideBreadcrumb />;
}

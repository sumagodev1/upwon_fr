import ProductPage from '../../pages/Product/ProductPage.jsx';

// Dedicated Vendor Portal page. Renders the shared ProductPage engine with the
// vendor-portal slug fixed, so this platform can diverge into custom sections
// later.
export default function VendorPortalPage() {
  return <ProductPage slug="vendor-portal" />;
}

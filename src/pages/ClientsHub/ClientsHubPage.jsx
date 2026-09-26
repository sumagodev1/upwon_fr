import ClientsHeroSection from './sections/ClientsHeroSection/ClientsHeroSection.jsx';
import ClientsCasesSection from './sections/ClientsCasesSection/ClientsCasesSection.jsx';
import ClientsRosterSection from './sections/ClientsRosterSection/ClientsRosterSection.jsx';
import ClientsTestimonialsSection from './sections/ClientsTestimonialsSection/ClientsTestimonialsSection.jsx';
import DeploymentMap from './sections/DeploymentMap/DeploymentMap.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';

export default function ClientsHubPage() {
  return (
    <>
      <Seo
        title="Clients & Case Studies — Named Operators on UpWon"
        description="Monginis, Kaka Halwai, U2 Cake, BrownBear, Mr Puff, Gokul Dairy and 40+ more — real outcomes, real numbers, named clients."
        canonical="https://upwon.in/clients"
      />
      <ClientsHeroSection />

      {/* Featured cases - authored in the admin panel (Clients → Case Studies) */}
      <ClientsCasesSection />

      {/* Client roster - authored in the admin panel (Clients → Roster Logos) */}
      <ClientsRosterSection>
        {/* Deployment footprint — interactive India map + coverage cards */}
        <DeploymentMap />
      </ClientsRosterSection>

      {/* Testimonials - authored in the admin panel (Clients → Testimonials) */}
      <ClientsTestimonialsSection />
    </>
  );
}

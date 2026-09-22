import Container from '../../components/shared/Container/Container.jsx';
import PageHero from '../../components/shared/PageHero/PageHero.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';

export default function LegalPage() {
  return (
    <>
      <Seo
        title="Privacy, Terms & Security"
        description="UpWon's privacy policy, terms of use and security commitments. Plain language, no surprises — from Byte Elephants Technologies."
        canonical="https://upwon.in/legal"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Legal' },
        ]}
        eyebrow="Legal"
        title="Privacy, Terms & Security."
        description="The legal foundations of how we operate. Plain language, no surprises."
      />

      <section className="relative overflow-hidden bg-white section-pad">
        <Container className="relative">
          <div className="mx-auto max-w-3xl space-y-12">
            <article>
              <h2 className="h-display text-2xl text-navy-950 md:text-3xl">Privacy Policy</h2>
              <p className="mt-4 text-sm text-charcoal">
                Byte Elephants Technologies Pvt Ltd ("we", "us", "UpWon") respects your privacy. We
                collect only the information needed to deliver the UpWon platform and improve our
                services. We do not sell, rent or share your personal data with third parties for
                marketing purposes.
              </p>
              <p className="mt-3 text-sm text-charcoal">
                Lead information collected via this website is used solely for sales follow-up and
                product communications. You can request deletion at any time by emailing{' '}
                <a href="mailto:hello@upwon.in" className="font-semibold text-orange-600">
                  hello@upwon.in
                </a>
                .
              </p>
            </article>

            <article>
              <h2 className="h-display text-2xl text-navy-950 md:text-3xl">Terms of Service</h2>
              <p className="mt-4 text-sm text-charcoal">
                Use of the UpWon platform is governed by a separate Master Services Agreement (MSA)
                signed at deployment. This website is informational only — no commercial agreement
                arises from website use.
              </p>
              <p className="mt-3 text-sm text-charcoal">
                All trademarks, product names, and content on this site are the property of Byte
                Elephants Technologies Pvt Ltd unless otherwise noted.
              </p>
            </article>

            <article>
              <h2 className="h-display text-2xl text-navy-950 md:text-3xl">Security</h2>
              <p className="mt-4 text-sm text-charcoal">
                UpWon is hosted on enterprise cloud infrastructure with industry-standard
                encryption, access controls, and audit logging. Implementation methodology is
                aligned to CMM Level 3 process standards. Customer data is segregated per tenant
                and never shared across deployments.
              </p>
              <p className="mt-3 text-sm text-charcoal">
                For security disclosures, contact{' '}
                <a href="mailto:hello@upwon.in" className="font-semibold text-orange-600">
                  hello@upwon.in
                </a>
                .
              </p>
            </article>

            <article>
              <h2 className="h-display text-2xl text-navy-950 md:text-3xl">Contact</h2>
              <p className="mt-4 text-sm text-charcoal">
                Byte Elephants Technologies Pvt Ltd<br />
                Nashik, Maharashtra, India<br />
                hello@upwon.in · +91 93568 98277
              </p>
            </article>

            <p className="border-t border-cream-300 pt-6 text-[14px] text-navy-500">
              This is a website prototype. Final legal text will be reviewed and approved by counsel
              before production launch.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

import Link from "next/link";
import {
  SITE_NAME,
  NAV_LINKS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  whatsappUrl,
} from "@/lib/constants";
import DigitalConciergeWidget from "@/components/concierge/DigitalConciergeWidget";
import BrandLogo from "@/components/ui/BrandLogo";
export default function Footer() {
  const whatsapp = whatsappUrl();
  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand">
              <BrandLogo footer />
              <span className="brand-name">{SITE_NAME}</span>
            </Link>
            <p className="form-note" style={{ marginTop: 24 }}>
              Victoria Falls · Zimbabwe
              <br />
              Victoria Falls outside. Home when you return.
            </p>
            <DigitalConciergeWidget />
          </div>
          <nav aria-label="Explore">
            <h2>Make yourself at home</h2>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Plan your stay">
            <h2>Your visit</h2>
            <Link href="/family-group-accommodation-victoria-falls">
              Families &amp; groups
            </Link>
            <Link href="/corporate-stays-victoria-falls">
              Work &amp; longer stays
            </Link>
            {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>Email us</a>}
            {CONTACT_PHONE && <a href={`tel:${CONTACT_PHONE}`}>Call us</a>}
            {whatsapp && <a href={whatsapp}>WhatsApp</a>}
            <Link href="/contact">Ask a question</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}
          </span>
          <span>A little more room for your Victoria Falls stay.</span>
        </div>
      </div>
    </footer>
  );
}

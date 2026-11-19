import Link from "next/link";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Editorial";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  whatsappUrl,
  SITE_NAME,
} from "@/lib/constants";
import type { EnquiryValues } from "@/lib/enquiry";

export default function Contact({
  initialValues,
  experienceTitle,
}: {
  initialValues?: Partial<EnquiryValues>;
  experienceTitle?: string;
}) {
  const whatsapp = whatsappUrl();
  return (
    <section className="section" id="enquiry">
      <Container>
        <div className="contact-layout">
          <EnquiryForm allowFlexibleDates initialValues={initialValues} />
          <aside>
            <h2>
              {experienceTitle
                ? "Ask about local experiences."
                : "Request confirmation from our team."}
            </h2>
            <p style={{ marginTop: 24 }}>
              {experienceTitle
                ? `Tell us about your interest in ${experienceTitle}, your dates and anything you would like to check. Sending this enquiry does not reserve an activity or an apartment.`
                : `Share your preferred dates and group details with ${SITE_NAME}. Submitting this form sends an availability enquiry rather than an instant booking — we will confirm open apartments, rates, and terms directly.`}
            </p>
            <div className="actions">
              {CONTACT_EMAIL && (
                <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
                  Email us →
                </a>
              )}
              {CONTACT_PHONE && (
                <a className="text-link" href={`tel:${CONTACT_PHONE}`}>
                  Call us →
                </a>
              )}
              {whatsapp && (
                <a
                  className="text-link"
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp →
                </a>
              )}
              <Link className="text-link" href="/plan">
                Plan Your Stay →
              </Link>
            </div>
            <p className="form-note">Victoria Falls, Zimbabwe</p>
          </aside>
        </div>
      </Container>
    </section>
  );
}

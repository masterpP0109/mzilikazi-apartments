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
          <EnquiryForm initialValues={initialValues} />
          <aside>
            <h2>{experienceTitle ? "Make room for your kind of experience." : "A good stay starts with a conversation."}</h2>
            <p style={{ marginTop: 24 }}>
              {experienceTitle ? `Tell us about your interest in ${experienceTitle}, your dates and anything you would like to check. Sending this enquiry does not reserve an activity or a room.` : `Tell ${SITE_NAME} a little about your visit. Include any accommodation preferences or questions you would like answered before you book.`}
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
                <a className="text-link" href={whatsapp}>
                  WhatsApp →
                </a>
              )}
            </div>
            <p className="form-note">Victoria Falls, Zimbabwe</p>
          </aside>
        </div>
      </Container>
    </section>
  );
}

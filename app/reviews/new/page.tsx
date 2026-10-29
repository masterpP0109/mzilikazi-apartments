import { Container, Eyebrow, PageIntro, TextLink } from "@/components/ui/Editorial";
import ReviewForm from "@/components/forms/ReviewForm";
import { propertyPhotos } from "@/lib/property";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Leave a Guest Review",
  "Share your feedback and experience staying at Mzilikazi Guest Lodge in Victoria Falls, Zimbabwe.",
  "/reviews/new",
);

export default function LeaveReviewPage() {
  return (
    <>
      <PageIntro
        eyebrow="Guest Feedback · Mzilikazi"
        title="Tell us about your Victoria Falls stay."
        media={propertyPhotos.exteriorVeranda}
        mediaRatio="wide"
      >
        <p>
          Your honest thoughts help fellow travellers plan their visits and allow our team
          to keep improving our self-catering apartments and local guest services.
        </p>
      </PageIntro>

      <section className="section" style={{ paddingTop: 0 }}>
        <Container>
          <div className="contact-layout">
            <div>
              <Eyebrow>Your Experience</Eyebrow>
              <h2>How was your time with us?</h2>
              <p style={{ marginTop: 20 }}>
                Whether you stayed for a weekend waterfall getaway or an extended working trip,
                we value your feedback on:
              </p>
              <ul className="amenity-grid" style={{ marginTop: 24 }}>
                <li>
                  <span aria-hidden="true">—</span> Apartment comfort &amp; cleanliness
                </li>
                <li>
                  <span aria-hidden="true">—</span> Self-catering kitchen &amp; lounge facilities
                </li>
                <li>
                  <span aria-hidden="true">—</span> Quietness &amp; courtyard atmosphere
                </li>
                <li>
                  <span aria-hidden="true">—</span> Airport transfer &amp; local recommendations
                </li>
              </ul>
              <div className="actions" style={{ marginTop: 32 }}>
                <TextLink href="/apartments">Explore our suites</TextLink>
                <TextLink href="/contact">Contact host directly</TextLink>
              </div>
            </div>

            <div className="review-form-wrapper">
              <ReviewForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

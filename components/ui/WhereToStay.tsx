import { Container, Eyebrow, ImageFrame, TextLink } from "./Editorial";
import Button from "./Button";
import { propertyPhotos } from "@/lib/property";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface WhereToStayProps {
  showOptions?: boolean;
}

export default function WhereToStay({
  showOptions = true,
}: WhereToStayProps = {}) {
  return (
    <section
      className="section where-to-stay"
      id="practical-amenities"
      aria-labelledby="where-to-stay-title"
    >
      <Container>
        <ScrollReveal>
          <div className="where-to-stay-layout">
            <ImageFrame
              media={propertyPhotos.living}
              ratio="landscape"
              sizes="(max-width: 767px) 100vw, 45vw"
            />
            <div className="where-to-stay-copy">
              <Eyebrow>Included in every apartment</Eyebrow>
              <h2 id="where-to-stay-title">
                Everything you need for a comfortable stay.
              </h2>
              <p>
                Settle into your own space with practical comforts for couples,
                families, and groups of up to four guests.
              </p>

              <ul
                className="amenity-grid"
                style={{ marginTop: 24, marginBottom: 24 }}
              >
                <li>
                  <span aria-hidden="true">—</span> Self-catering kitchens
                </li>
                <li>
                  <span aria-hidden="true">—</span> Wi-Fi &amp; air conditioning
                </li>
                <li>
                  <span aria-hidden="true">—</span> On-site parking (up to 4
                  vehicles across property)
                </li>
                <li>
                  <span aria-hidden="true">—</span> Washing machine &amp; cleaner
                  provided
                </li>
                <li>
                  <span aria-hidden="true">—</span> Electric fence &amp; dura
                  wall security
                </li>
                <li>
                  <span aria-hidden="true">—</span> Private chef available on
                  request
                </li>
              </ul>

              <div className="actions">
                {showOptions ? (
                  <Button href="/apartments#compare">Compare Apartments</Button>
                ) : (
                  <Button href="/contact">Request Availability →</Button>
                )}
                <TextLink href="/contact">Talk to Our Team</TextLink>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

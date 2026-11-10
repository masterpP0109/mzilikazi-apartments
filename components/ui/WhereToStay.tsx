import { Container, Eyebrow, ImageFrame, TextLink } from "./Editorial";
import Button from "./Button";
import { propertyPhotos } from "@/lib/property";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface WhereToStayProps {
  showOptions?: boolean;
}

export default function WhereToStay({ showOptions = true }: WhereToStayProps = {}) {
  return (
    <section className="section where-to-stay" id="practical-amenities" aria-labelledby="where-to-stay-title">
      <Container>
        <ScrollReveal>
          <div className="where-to-stay-layout">
            <ImageFrame media={propertyPhotos.living} ratio="landscape" sizes="(max-width: 767px) 100vw, 45vw" />
            <div className="where-to-stay-copy">
              <Eyebrow>Practical Living · What's Included</Eyebrow>
              <h2 id="where-to-stay-title">Everything you need to feel settled.</h2>
              <p>
                Each apartment is self-contained with two bedrooms, sleeping up to four guests. Whether staying for a weekend or several weeks, you enjoy private living with hotel-grade support.
              </p>
              
              <ul className="amenity-grid" style={{ marginTop: 24, marginBottom: 24 }}>
                <li><span aria-hidden="true">—</span> Fully equipped kitchen &amp; gas stovetop</li>
                <li><span aria-hidden="true">—</span> Cleaner provided for your stay</li>
                <li><span aria-hidden="true">—</span> Air conditioning &amp; high-speed Wi-Fi</li>
                <li><span aria-hidden="true">—</span> En-suite bathrooms with fresh linens</li>
                <li><span aria-hidden="true">—</span> Secure parking for up to 4 vehicles</li>
                <li><span aria-hidden="true">—</span> Private chef available on request</li>
              </ul>

              <div className="actions">
                <Button href="/apartments#compare">Compare Apartments</Button>
                <TextLink href="/contact">Ask a question</TextLink>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={100}>
          <div className="stay-experience-connection">
            <Eyebrow>Finding the Right Fit</Eyebrow>
            <h3>Choosing between our apartments</h3>
            <p>
              All three apartments offer two bedrooms, self-catering kitchens and air conditioning. Choose <strong>Mzilikazi Suite</strong> for its open breakfast bar and bathtub; <strong>Lobengula Suite</strong> for its dining area and walk-in shower; or <strong>Nkulumane Suite</strong> for a peaceful garden-facing retreat.
            </p>
            <div className="actions" style={{ marginTop: 20 }}>
              <TextLink href="/apartments">Explore all accommodations →</TextLink>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

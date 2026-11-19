import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="section stone final-cta">
      <Container>
        <Eyebrow>Enquire about your dates</Eyebrow>
        <h2>Tell us your dates and we’ll confirm what’s available.</h2>
        <p>
          Send your travel dates and guest numbers. Our team will confirm the
          available apartments and current rates.
        </p>
        <div className="actions">
          <Button href="/contact">Request Availability →</Button>
          <TextLink href="/plan">Plan Your Stay</TextLink>
        </div>
      </Container>
    </section>
  );
}

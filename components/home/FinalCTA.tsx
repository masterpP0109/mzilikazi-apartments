import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="section stone final-cta">
      <Container>
        <Eyebrow>Enquire about your dates</Eyebrow>
        <h2>Tell us your dates and we’ll confirm what’s available.</h2>
        <p>
          Send your travel dates and guest numbers. Availability and the final
          price are confirmed personally by our team before payment.
        </p>
        <div className="actions">
          <Button href="/contact">Check Availability →</Button>
          <TextLink href="/contact?message=I%20would%20like%20to%20speak%20with%20the%20team%20about%20a%20stay.">
            Talk to Our Team
          </TextLink>
          <TextLink href="/plan">Plan Your Stay</TextLink>
        </div>
      </Container>
    </section>
  );
}

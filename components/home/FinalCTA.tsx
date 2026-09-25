import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import Button from "@/components/ui/Button";
export default function FinalCTA() {
  return (
    <section className="section stone final-cta">
      <Container>
        <Eyebrow>Your next chapter</Eyebrow>
        <h2>Victoria Falls is waiting.</h2>
        <p>Let’s start with your dates. The rest can follow.</p>
        <div className="actions">
          <Button href="/contact">Check availability →</Button>
          <TextLink href="/contact#enquiry">Ask a question</TextLink>
        </div>
      </Container>
    </section>
  );
}

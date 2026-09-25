import { Container, TextLink } from "@/components/ui/Editorial";
export default function WhoIsItFor() {
  return (
    <section className="section">
      <Container>
        <h2>Your people. Your pace.</h2>
        <div className="actions">
          <TextLink href="/family-group-accommodation-victoria-falls">
            Families & groups
          </TextLink>
          <TextLink href="/corporate-stays-victoria-falls">
            Work & longer stays
          </TextLink>
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Editorial";
export default function TrustStrip() {
  return (
    <Container>
      <section className="value-strip" aria-label="A stay at your pace">
        <div>
          <h2>Self-catering freedom</h2>
          <p>A stay shaped around your day.</p>
        </div>
        <div>
          <h2>Victoria Falls, your way</h2>
          <p>Make time for the things you came for.</p>
        </div>
        <div>
          <h2>Start a conversation</h2>
          <p>Your dates. Your questions. One enquiry.</p>
        </div>
      </section>
    </Container>
  );
}

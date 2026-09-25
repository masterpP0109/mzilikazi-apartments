import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { confirmedServices } from "@/lib/property";
export default function LocalServices() {
  return (
    <section className="section">
      <Container>
        <div className="editorial-split">
          <div>
            <Eyebrow>A little planning goes a long way</Eyebrow>
            <h2>Need help planning your stay?</h2>
          </div>
          <div>
            <p>
              Start with what matters to you. Share your dates, your interests
              and any questions about getting here or exploring the area.
            </p>
            {confirmedServices
              .filter((s) => s.confirmed)
              .map((s) => (
                <p key={s.title}>
                  {s.title}: {s.description}
                </p>
              ))}
            <div className="actions">
              <TextLink href="/contact?message=I%20would%20like%20help%20planning%20my%20stay.">
                Let’s talk about your visit
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

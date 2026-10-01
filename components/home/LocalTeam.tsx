import {
  Container,
  Eyebrow,
  ImageFrame,
  TextLink,
} from "@/components/ui/Editorial";
import { localTeam } from "@/lib/property";
export default function LocalTeam() {
  const verified = localTeam.filter((t) => t.verified);
  return (
    <section id="local-team" className="section stone">
      <Container>
        <div className="editorial-split">
          <div>
            <Eyebrow>A conversation before you arrive</Eyebrow>
            <h2>Local people. Local knowledge.</h2>
          </div>
          <div>
            <p>
              A good trip starts with a few useful questions. Ask about
              transfers, activities, getting around, restaurant ideas and the
              practical details of your days here.
            </p>
            <p className="form-note">
              Discuss what can be arranged and confirm providers, prices and
              availability with your enquiry.
            </p>
            <div className="actions">
              <TextLink href="/contact?message=I%20have%20a%20question%20about%20my%20Victoria%20Falls%20visit.">
                Ask Us a Question
              </TextLink>
            </div>
          </div>
        </div>
        {verified.length > 0 && (
          <div className="journey-grid">
            {verified.map((t) => (
              <article key={t.name}>
                <ImageFrame media={t.media} />
                <h3>{t.name}</h3>
                <p className="eyebrow">{t.role}</p>
                <p>{t.bio}</p>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

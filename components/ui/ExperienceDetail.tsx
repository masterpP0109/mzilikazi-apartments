import { experiences } from "@/lib/property";
import {
  PageIntro,
  Container,
  ImageFrame,
  TextLink,
  Eyebrow,
} from "./Editorial";
import Button from "./Button";
export default function ExperienceDetail({ slug }: { slug: string }) {
  const e = experiences.find((x) => x.slug === slug)!;
  return (
    <>
      <PageIntro eyebrow={e.category} title={e.title}>
        <p>{e.description}</p>
      </PageIntro>
      <section className="section">
        <Container>
          <ImageFrame media={e.media} ratio="wide" />
          <div className="editorial-split">
            <div>
              <Eyebrow>Room to explore</Eyebrow>
              <h2>Build your day around what moves you.</h2>
            </div>
            <div>
              <p>{e.detail}</p>
              <p className="form-note" style={{ marginTop: 24 }}>
                Discuss current options and arrangements before booking. Sending
                an enquiry does not reserve an activity.
              </p>
              <div className="actions">
                <Button
                  href={`/contact?service=${encodeURIComponent(e.category)}&message=${encodeURIComponent("I would like to ask about " + e.title)}`}
                >
                  Ask about this experience →
                </Button>
                <TextLink href="/experiences">All experiences</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

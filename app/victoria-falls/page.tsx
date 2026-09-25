import {
  PageIntro,
  Container,
  Eyebrow,
  TextLink,
  ImageFrame,
} from "@/components/ui/Editorial";
import { propertyMedia } from "@/lib/property";
import Experience from "@/components/home/Experience";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Victoria Falls, Zimbabwe",
  "Make Victoria Falls the experience and Mzilikazi your base. Explore ideas and plan your stay.",
  "/victoria-falls",
);
export default function VictoriaFallsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Victoria Falls · Zimbabwe"
        title="Come for the wonder. Stay for a while."
      >
        <p>
          There is more to a visit than a single viewpoint. Give yourself time
          to explore, and time to do very little at all.
        </p>
      </PageIntro>
      <section className="section">
        <Container>
          <ImageFrame media={propertyMedia.destination} ratio="wide" />
          <div className="editorial-split">
            <div>
              <Eyebrow>At your own pace</Eyebrow>
              <h2>Leave a little space in the itinerary.</h2>
            </div>
            <div>
              <p>
                Start with the Falls. Add the experiences that interest you.
                Keep a little breathing room between the two.
              </p>
              <p style={{ marginTop: 24 }}>
                Before travelling, check current entry requirements with the
                relevant authorities and confirm activity details directly with
                the operator.
              </p>
              <div className="actions">
                <TextLink href="/contact">Talk about your plans</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Experience />
    </>
  );
}

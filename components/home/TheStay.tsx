import {
  Container,
  Eyebrow,
  ImageFrame,
  TextLink,
} from "@/components/ui/Editorial";
import { propertyMedia, isPublicMedia } from "@/lib/property";
export default function TheStay() {
  return (
    <section className="section stone">
      <Container>
        <div className="editorial-split">
          {isPublicMedia(propertyMedia.story) ? (
            <ImageFrame media={propertyMedia.story} ratio="portrait" />
          ) : (
            <p className="story-statement">
              The best part of a full day?
              <br />
              <em>Making yourself at home.</em>
            </p>
          )}
          <div className="editorial-copy">
            <Eyebrow>A different rhythm</Eyebrow>
            <h2>More than somewhere to sleep.</h2>
            <p>
              There is a simple pleasure in travelling on your own terms. A slow
              breakfast. A day left open. Time to decompress when you return.
            </p>
            <p>
              That is the appeal of a self-catering stay: a little independence,
              and a place to come back to.
            </p>
            <div className="actions">
              <TextLink href="/apartments">Make room for your stay</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

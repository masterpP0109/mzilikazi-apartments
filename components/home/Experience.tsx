import {
  Container,
  Eyebrow,
  ImageFrame,
  TextLink,
} from "@/components/ui/Editorial";
import { propertyMedia } from "@/lib/property";
export default function Experience() {
  return (
    <section className="section destination">
      <Container>
        <Eyebrow>Beyond your doorstep</Eyebrow>
        <h2>
          The Falls are the experience.
          <br />
          Mzilikazi is your base.
        </h2>
        <p>
          Leave room for the big moments and the unplanned ones. Then return to
          a slower pace.
        </p>
        <ImageFrame media={propertyMedia.destination} ratio="wide" />
        <div className="destination-topics">
          <div>
            <h3>The Falls</h3>
            <p>Water, rainforest and a different perspective.</p>
          </div>
          <div>
            <h3>Wildlife</h3>
            <p>Make space for the natural world.</p>
          </div>
          <div>
            <h3>Adventure</h3>
            <p>A little more possibility in your day.</p>
          </div>
        </div>
        <div className="actions">
          <TextLink href="/experiences">Explore experiences</TextLink>
          <TextLink href="/victoria-falls">Get to know Victoria Falls</TextLink>
        </div>
      </Container>
    </section>
  );
}

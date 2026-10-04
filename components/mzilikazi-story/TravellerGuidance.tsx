import { Container, Eyebrow, ImageFrame } from "@/components/ui/Editorial";
import { propertyPhotos } from "@/lib/property";
import { storyContent } from "./content";
import { StoryParagraphs } from "./StoryText";

export default function TravellerGuidance() {
  return (
    <section className="education-travellers section" aria-labelledby="education-travellers-title">
      <Container>
        <header className="education-heading">
          <Eyebrow>The people you travel with</Eyebrow>
          <h3 id="education-travellers-title">A stay shaped around you.</h3>
        </header>
        {storyContent.travellers.map((traveller, index) => (
          <article key={traveller.id} className={`education-traveller education-split ${index % 2 ? "education-split--reverse" : ""}`} aria-labelledby={`education-traveller-${traveller.id}`}>
            <div className="education-reading">
              <h4 id={`education-traveller-${traveller.id}`}>{traveller.heading}</h4>
              <StoryParagraphs paragraphs={traveller.paragraphs} />
            </div>
            <figure className="education-image">
              <ImageFrame media={propertyPhotos[traveller.media]} ratio="portrait" sizes="(max-width: 767px) 92vw, 44vw" />
            </figure>
          </article>
        ))}
      </Container>
    </section>
  );
}

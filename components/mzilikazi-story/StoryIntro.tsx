import { Container, Eyebrow, ImageFrame } from "@/components/ui/Editorial";
import { propertyPhotos } from "@/lib/property";
import { storyContent } from "./content";
import { StoryParagraphs, StoryQuote } from "./StoryText";

export default function StoryIntro() {
  const { intro } = storyContent;
  return (
    <div className="education-intro section">
      <Container>
        <header className="education-heading">
          <Eyebrow>Welcome to Mzilikazi</Eyebrow>
          <h2 id="mzilikazi-education-title">{intro.heading}</h2>
        </header>
        <div className="education-split education-split--intro">
          <figure className="education-image">
            <ImageFrame media={propertyPhotos.exteriorView} ratio="portrait" sizes="(max-width: 767px) 92vw, 44vw" />
            <figcaption>Your Victoria Falls home base.</figcaption>
          </figure>
          <StoryParagraphs paragraphs={intro.paragraphs.filter(p => p.kind !== "quote")} />
        </div>
        {intro.paragraphs.filter(p => p.kind === "quote").map(p => <StoryQuote key={p.text} text={p.text} className="education-quote--wide" />)}
      </Container>
    </div>
  );
}

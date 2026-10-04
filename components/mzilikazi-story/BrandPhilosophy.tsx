import { Container, Eyebrow } from "@/components/ui/Editorial";
import BackgroundSection from "@/components/ui/BackgroundSection";
import { propertyPhotos } from "@/lib/property";
import { storyContent } from "./content";
import { StoryParagraphs, StoryQuote } from "./StoryText";

export default function BrandPhilosophy() {
  const chapter = storyContent.philosophy;
  const quoteIndex = chapter.paragraphs.findIndex(p => p.kind === "quote");
  return (
    <section className="education-philosophy" aria-labelledby="education-philosophy-title">
      <div className="section stone">
        <Container>
          <div className="education-reading education-reading--center">
            <Eyebrow>Our role in your journey</Eyebrow>
            <h3 id="education-philosophy-title">{chapter.heading}</h3>
            <StoryParagraphs paragraphs={chapter.paragraphs.slice(0, quoteIndex)} />
          </div>
        </Container>
      </div>
      <BackgroundSection media={propertyPhotos.patio} className="education-photo-statement">
        <Container><div className="story-panel"><StoryQuote text={chapter.paragraphs[quoteIndex].text} /></div></Container>
      </BackgroundSection>
      <div className="section stone">
        <Container><div className="education-reading education-reading--center"><StoryParagraphs paragraphs={chapter.paragraphs.slice(quoteIndex + 1)} /></div></Container>
      </div>
    </section>
  );
}

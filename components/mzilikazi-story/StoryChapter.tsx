import { Container, Eyebrow, ImageFrame } from "@/components/ui/Editorial";
import { propertyPhotos } from "@/lib/property";
import { StoryParagraphs, type ChapterContent } from "./StoryText";

export default function StoryChapter({ chapter, index, label }: { chapter: ChapterContent; index: number; label: string }) {
  return (
    <section id={`mzilikazi-${chapter.id}`} aria-labelledby={`education-${chapter.id}-title`} className={`education-chapter section ${index % 2 === 0 ? "stone" : ""}`}>
      <Container>
        <div className={`education-split ${index % 2 ? "education-split--reverse" : ""}`}>
          <div className="education-reading">
            <Eyebrow>{label}</Eyebrow>
            <h3 id={`education-${chapter.id}-title`}>{chapter.heading}</h3>
            <StoryParagraphs paragraphs={chapter.paragraphs} />
          </div>
          <figure className="education-image">
            <ImageFrame media={propertyPhotos[chapter.media]} ratio="landscape" sizes="(max-width: 767px) 92vw, 44vw" />
          </figure>
        </div>
      </Container>
    </section>
  );
}

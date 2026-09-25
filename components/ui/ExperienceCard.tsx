import { ImageFrame, Eyebrow, TextLink } from "./Editorial";
import { experiences } from "@/lib/property";
export default function ExperienceCard({
  experience: e,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  return (
    <article className="experience-row">
      <div>
        <span className="experience-number">
          0{index + 1} / {e.category}
        </span>
        <ImageFrame media={e.media} ratio="wide" />
      </div>
      <div>
        <Eyebrow>{e.category}</Eyebrow>
        <h2>{e.title}</h2>
        <p>{e.description}</p>
        <div className="actions">
          <TextLink href={`/experiences/${e.slug}`}>
            Explore {e.category.toLowerCase()}
          </TextLink>
        </div>
      </div>
    </article>
  );
}

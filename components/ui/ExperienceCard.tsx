import { AddToTrip } from "@/components/trip/TripProvider";
import { ImageFrame, Eyebrow, TextLink } from "./Editorial";
import { experiences } from "@/lib/property";
export default function ExperienceCard({
  experience: e,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  return (
    <article className="experience-row">
      <div>
        <span className="experience-number">{e.category}</span>
        <ImageFrame media={e.media} ratio="wide" />
      </div>
      <div>
        <Eyebrow>{e.category}</Eyebrow>
        <h2>{e.title}</h2>
        <p>{e.description}</p>
        {e.duration && <p className="form-note">Duration: {e.duration}</p>}
        {e.travellerTypes.length > 0 && (
          <p className="form-note">Suits: {e.travellerTypes.join(", ")}</p>
        )}
        <p className="form-note">{e.practicalNote}</p>
        <div className="actions">
          <TextLink href={`/experiences/${e.slug}`}>
            Explore {e.category.toLowerCase()}
          </TextLink>
          <AddToTrip kind="experience" id={e.slug} />
        </div>
      </div>
    </article>
  );
}

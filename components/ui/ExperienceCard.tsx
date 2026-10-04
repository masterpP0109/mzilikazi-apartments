import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { AddToTrip } from "@/components/trip/TripProvider";
import { ImageFrame, Eyebrow } from "./Editorial";
import ExperiencePrice from "./ExperiencePrice";
import type { Experience } from "@/lib/experience-content";
export default function ExperienceCard({experience: e, heading = "h2"}: {experience: Experience; index?: number; heading?: "h2" | "h3"}) {
  const Heading = heading;
  return <article className="experience-card">
    {e.media ? <ImageFrame media={e.media} ratio="wide" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 30vw"/> : <div className="experience-fallback"><Compass size={40} aria-hidden="true"/><span>Local culture</span></div>}
    <div className="experience-card-copy">
      <Eyebrow>{e.category}</Eyebrow><Heading>{e.title}</Heading><p>{e.description}</p>
      <ExperiencePrice experience={e} compact/>
      {e.duration && <p className="form-note">{e.duration}</p>}
      <div className="actions"><Link className="text-link experience-card-link" href={`/experiences/${e.slug}`} aria-label={`Explore Experience: ${e.title}`}>Explore Experience <ArrowRight size={17} aria-hidden="true"/></Link><AddToTrip kind="experience" id={e.slug}/></div>
    </div>
  </article>;
}

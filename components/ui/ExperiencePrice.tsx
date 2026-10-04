import { experiencePriceLabel, experiencePricingNote, type Experience } from "@/lib/experience-content";
export default function ExperiencePrice({experience, compact=false}: {experience: Experience; compact?: boolean}) {
  return <div className={compact ? "experience-price experience-price-compact" : "experience-price"}>
    <p className="experience-price-label">{experiencePriceLabel(experience)}</p>
    {experience.priceContext && <p className="experience-price-context">{experience.priceContext}</p>}
    <p className="experience-price-note">{experience.startingPrice == null ? "A verified starting rate for this specific ride is pending. Your booking quote will identify the ride, transport and any extras." : compact ? "Indicative rate; package and additional fees affect the total." : experiencePricingNote}</p>
  </div>;
}

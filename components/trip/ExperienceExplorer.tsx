"use client";
import { useState } from "react";
import { experiences } from "@/lib/property";
import { experienceCategories } from "@/lib/planning";
import ExperienceCard from "@/components/ui/ExperienceCard";
import Link from "next/link";
export default function ExperienceExplorer() {
  const [category, setCategory] = useState("All");
  const filtered = experiences.filter(
    (e) => e.enabled && (category === "All" || e.categories.includes(category)),
  );
  return (
    <>
      <div className="filter-options" role="group" aria-label="Filter experiences">
        {experienceCategories.map((c) => (
          <button
            key={c}
            className="button button-secondary"
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <p className="form-note">
          {filtered.length} {filtered.length === 1 ? "idea" : "ideas"} to
          explore
        </p>
        {filtered.length ? (
          <div className="experience-grid">{filtered.map((e) => (
            <ExperienceCard key={e.slug} experience={e} />
          ))}</div>
        ) : (
          <div className="empty-accommodation">
            <h2>Make room for your kind of day.</h2>
            <div>
              <p>
                Tell us what you have in mind so you can discuss current options
                and suitability before choosing an activity.
              </p>
              <Link
                className="text-link"
                href={"/plan?interest=" + encodeURIComponent(category)}
              >
                Plan around {category.toLowerCase()} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
